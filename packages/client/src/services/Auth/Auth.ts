// TODO: Весь функционал здесь лежит ВРЕМЕННО, пока мы не договоримся о том как работать с сетью в приложении и разобьем этот файл на нормальные составляющие

interface ISignInRequestBody {
  login: string
  password: string
}

type TSignInResponseData = void

interface ISignUpRequestBody {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

interface ISignUpResponseData {
  id: number
}

type TAuthenticateResponseData = ISignUpRequestBody

type TAwaitable<TReturn> = TReturn | Promise<TReturn>

type TQueryState<TQueryData> = {
  data: TQueryData | undefined
  error: Error | undefined
  successful: boolean
}

const UNKNOWN_ERROR_MESSAGE = 'Неизвестная ошибка'

export class Auth {
  private _entrypoint = 'https://ya-praktikum.tech/api/v2/auth'

  private static _instance = new Auth()

  private constructor() {
    if (Auth._instance) {
      return Auth._instance
    }

    Auth._instance = this

    return this
  }

  static getInstance() {
    return Auth._instance
  }

  private _getRequestInitParams({
    method = 'GET',
    body,
    ...rest
  }: Omit<RequestInit, 'body'> & { body?: unknown } = {}) {
    const requestInitParams: RequestInit = {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    }

    return requestInitParams
  }

  private async _getResponseData<TQueryData>(
    queryFn: () => TAwaitable<Response>
  ) {
    const state: TQueryState<TQueryData> = {
      data: undefined,
      error: undefined,
      successful: false,
    }

    try {
      const response = await queryFn()

      // TODO: разумеется что волшебных статусов быть не должно, но пока у нас опять же нет общего api клиента и констант со статусами
      if (response.status === 400) {
        const { reason } = await response.json()

        throw new Error(reason || UNKNOWN_ERROR_MESSAGE)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.text()

      // TODO: вот тут такой кринж, потому что ЯП иногда возвращает вместо JSON просто текст, а иногда JSON, а иногда вообще ничего, :classic:
      try {
        state.data = JSON.parse(data)
      } catch {
        state.data = data as unknown as TQueryData
      }

      state.successful = true
    } catch (error) {
      if (error instanceof Error) {
        state.error = error
      } else {
        state.error = new Error(UNKNOWN_ERROR_MESSAGE)
      }
    }

    return state
  }

  signup(requestBody: ISignUpRequestBody) {
    return this._getResponseData<ISignUpResponseData>(() =>
      fetch(
        `${this._entrypoint}/signup`,
        this._getRequestInitParams({
          method: 'POST',
          body: requestBody,
        })
      )
    )
  }

  signin(requestBody: ISignInRequestBody) {
    return this._getResponseData<TSignInResponseData>(() =>
      fetch(
        `${this._entrypoint}/signin`,
        this._getRequestInitParams({
          method: 'POST',
          body: requestBody,
        })
      )
    )
  }

  authenticate() {
    return this._getResponseData<TAuthenticateResponseData>(() =>
      fetch(`${this._entrypoint}/user`, this._getRequestInitParams())
    )
  }

  logout() {
    return this._getResponseData(() =>
      fetch(
        `${this._entrypoint}/logout`,
        this._getRequestInitParams({ method: 'POST' })
      )
    )
  }
}
