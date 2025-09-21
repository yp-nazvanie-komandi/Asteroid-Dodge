//!!! ВНИМАНИЕ ДАННЫЙ ФАЙЛ ЯВЛЯЕТСЯ ФОРКОМ baseQuery ИЗ rtkq С ДОП ВОЗМОЖНОСТЬЮ ОБРАБОТКИ responseHandler ЗАМЕНИТЬ НА AXIOS ИЛИ ПЕРЕПИСАТЬ!!!
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThunkDispatch } from '@reduxjs/toolkit'

type Override<T1, T2> = T2 extends any ? Omit<T1, keyof T2> & T2 : never

type MaybePromise<T> = T | PromiseLike<T>

interface BaseQueryApi {
  signal: AbortSignal
  abort: (reason?: string) => void
  dispatch: ThunkDispatch<any, any, any>
  getState: () => unknown
  extra: unknown
  endpoint: string
  type: 'query' | 'mutation'
  /**
   * Only available for queries: indicates if a query has been forced,
   * i.e. it would have been fetched even if there would already be a cache entry
   * (this does not mean that there is already a cache entry though!)
   *
   * This can be used to for example add a `Cache-Control: no-cache` header for
   * invalidated queries.
   */
  forced?: boolean
  /**
   * Only available for queries: the cache key that was used to store the query result
   */
  queryCacheKey?: string
}

type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E
      data?: undefined
      meta?: M
    }
  | {
      error?: undefined
      data: T
      meta?: M
    }

type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {},
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions,
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>

function isAbsoluteUrl(url: string) {
  return new RegExp(`(^|:)//`).test(url)
}

function isPlainObject(obj: unknown) {
  if (typeof obj !== 'object' || obj === null) return false

  const proto = Object.getPrototypeOf(obj)
  if (proto === null) return true

  let baseProto = proto
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto)
  }

  return proto === baseProto
}

const withoutTrailingSlash = (url: string) => url.replace(/\/$/, '')
const withoutLeadingSlash = (url: string) => url.replace(/^\//, '')

function joinUrls(base: string | undefined, url: string | undefined): string {
  if (!base) {
    return url!
  }
  if (!url) {
    return base
  }

  if (isAbsoluteUrl(url)) {
    return url
  }

  const delimiter = base.endsWith('/') || !url.startsWith('?') ? '/' : ''
  base = withoutTrailingSlash(base)
  url = withoutLeadingSlash(url)

  return `${base}${delimiter}${url}`
}

type ResponseHandler = (
  response: Response,
  api: Pick<
    BaseQueryApi,
    'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
  > & { arg: string | FetchArgs; extraOptions: unknown },
) => Promise<any>

type CustomRequestInit = Override<
  RequestInit,
  {
    headers?:
      | Headers
      | string[][]
      | Record<string, string | undefined>
      | undefined
  }
>

interface FetchArgs extends CustomRequestInit {
  url: string
  params?: Record<string, any>
  body?: any
  responseHandler?: ResponseHandler
  validateStatus?: (response: Response, body: any) => boolean
}

const defaultFetchFn: typeof fetch = (...args) => fetch(...args)

const defaultValidateStatus = (response: Response) =>
  response.status >= 200 && response.status <= 299

const defaultIsJsonContentType = (headers: Headers) =>
  /*applicat*/ /ion\/(vnd\.api\+)?json/.test(headers.get('content-type') || '')

type FetchBaseQueryError =
  | {
      /**
       * * `number`:
       *   HTTP status code
       */
      status: number
      data: unknown
    }
  | {
      /**
       * * `"FETCH_ERROR"`:
       *   An error that occurred during execution of `fetch` or the `fetchFn` callback option
       **/
      status: 'FETCH_ERROR'
      data?: undefined
      error: string
    }
  | {
      /**
       * * `"PARSING_ERROR"`:
       *   An error happened during parsing.
       *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
       *   or an error occurred while executing a custom `responseHandler`.
       **/
      status: 'PARSING_ERROR'
      originalStatus: number
      data: string
      error: string
    }
  | {
      /**
       * * `"TIMEOUT_ERROR"`:
       *   Request timed out
       **/
      status: 'TIMEOUT_ERROR'
      data?: undefined
      error: string
    }
  | {
      /**
       * * `"CUSTOM_ERROR"`:
       *   A custom error type that you can return from your `queryFn` where another error might not make sense.
       **/
      status: 'CUSTOM_ERROR'
      data?: unknown
      error: string
    }

function stripUndefined(obj: any) {
  if (!isPlainObject(obj)) {
    return obj
  }
  const copy: Record<string, any> = { ...obj }
  for (const [k, v] of Object.entries(copy)) {
    if (v === undefined) delete copy[k]
  }
  return copy
}

type FetchBaseQueryArgs = {
  baseUrl?: string
  prepareHeaders?: (
    headers: Headers,
    api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
    > & { arg: string | FetchArgs; extraOptions: unknown },
  ) => MaybePromise<Headers | void>
  fetchFn?: (
    input: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<Response>
} & RequestInit &
  Pick<FetchArgs, 'responseHandler' | 'validateStatus'>

type FetchBaseQueryMeta = { request: Request; response?: Response }

export function fetchBaseQueryModified({
  baseUrl,
  prepareHeaders = x => x,
  fetchFn = defaultFetchFn,
  responseHandler: globalResponseHandler,
  ...baseFetchOptions
}: FetchBaseQueryArgs = {}): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> {
  return async (arg, api, extraOptions) => {
    const { getState, extra, endpoint, forced, type } = api
    let meta: FetchBaseQueryMeta | undefined
    let {
      url,
      headers = new Headers(baseFetchOptions.headers),
      params = undefined,
      responseHandler = globalResponseHandler ?? (async () => {}),
      validateStatus = defaultValidateStatus,
      ...rest
    } = typeof arg == 'string' ? { url: arg } : arg

    const signal = api.signal

    const config: RequestInit = {
      ...baseFetchOptions,
      signal,
      ...rest,
    }

    headers = new Headers(stripUndefined(headers))
    config.headers =
      (await prepareHeaders(headers, {
        getState,
        arg,
        extra,
        endpoint,
        forced,
        type,
        extraOptions,
      })) || headers

    // Only set the content-type to json if appropriate. Will not be true for FormData, ArrayBuffer, Blob, etc.
    const isJsonifiable = (body: any) =>
      typeof body === 'object' &&
      (isPlainObject(body) ||
        Array.isArray(body) ||
        typeof body.toJSON === 'function')

    if (!config.headers.has('content-type') && isJsonifiable(config.body)) {
      config.headers.set('content-type', 'application/json')
    }

    if (
      isJsonifiable(config.body) &&
      defaultIsJsonContentType(config.headers)
    ) {
      config.body = JSON.stringify(config.body)
    }

    if (params) {
      const divider = ~url.indexOf('?') ? '&' : '?'
      const query = new URLSearchParams(stripUndefined(params))
      url += divider + query
    }

    url = joinUrls(baseUrl, url)

    const request = new Request(url, config)
    const requestClone = new Request(url, config)
    meta = { request: requestClone }

    let response

    try {
      response = await fetchFn(request)
    } catch (e) {
      return {
        error: {
          status: 'FETCH_ERROR',
          error: String(e),
        },
        meta,
      }
    }
    const responseClone = response.clone()

    meta.response = responseClone

    let resultData: any
    let responseText = ''
    try {
      let handleResponseError
      await Promise.all([
        handleResponse(
          response,
          {
            getState,
            arg,
            extra,
            endpoint,
            forced,
            type,
            extraOptions,
          },
          responseHandler,
        ).then(
          r => (resultData = r),
          e => (handleResponseError = e),
        ),
        // see https://github.com/node-fetch/node-fetch/issues/665#issuecomment-538995182
        // we *have* to "use up" both streams at the same time or they will stop running in node-fetch scenarios
        responseClone.text().then(
          r => (responseText = r),
          () => {},
        ),
      ])
      if (handleResponseError) throw handleResponseError
    } catch (e) {
      return {
        error: {
          status: 'PARSING_ERROR',
          originalStatus: response.status,
          data: responseText,
          error: String(e),
        },
        meta,
      }
    }

    return validateStatus(response, resultData)
      ? {
          data: resultData,
          meta,
        }
      : {
          error: {
            status: response.status,
            data: resultData,
          },
          meta,
        }
  }

  async function handleResponse(
    response: Response,
    api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
    > & { arg: string | FetchArgs; extraOptions: unknown },
    responseHandler: ResponseHandler,
  ) {
    if (typeof responseHandler === 'function') {
      return responseHandler(response, api)
    }

    return response.text()
  }
}
