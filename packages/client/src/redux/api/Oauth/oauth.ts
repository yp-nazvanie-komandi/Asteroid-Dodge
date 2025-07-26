/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!

import { baseAPI as api } from '../base'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    postOauthYandex: build.mutation<
      PostOauthYandexApiResponse,
      PostOauthYandexApiArg
    >({
      query: queryArg => ({
        url: `/oauth/yandex`,
        method: 'POST',
        body: queryArg.oauthSignInRequest,
      }),
    }),
    getOauthYandexServiceId: build.query<
      GetOauthYandexServiceIdApiResponse,
      GetOauthYandexServiceIdApiArg
    >({
      query: queryArg => ({
        url: `/oauth/yandex/service-id`,
        params: {
          redirect_uri: queryArg.redirectUri,
        },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as OauthAPI }
export type PostOauthYandexApiResponse = /** status 200 Ok */ string
export type PostOauthYandexApiArg = {
  /** Oauth data */
  oauthSignInRequest: OauthSignInRequest
}
export type GetOauthYandexServiceIdApiResponse =
  /** status 200 Yandex client id */ ServiceId
export type GetOauthYandexServiceIdApiArg = {
  /** Redirect uri that you are using for oauth */
  redirectUri?: string
}
export type HttpErrorBody = {
  /** Error message */
  reason: string
}
export type OauthSignInRequest = {
  /** User code from Yandex */
  code: string
  /** Redirect uri that you are using for oauth */
  redirect_uri: string
}
export type ServiceId = {
  /** Service id */
  service_id: string
}
export const {
  usePostOauthYandexMutation,
  useGetOauthYandexServiceIdQuery,
  useLazyGetOauthYandexServiceIdQuery,
} = injectedRtkApi
