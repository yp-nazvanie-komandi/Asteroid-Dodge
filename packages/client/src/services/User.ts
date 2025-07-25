// TODO: Весь функционал здесь лежит ВРЕМЕННО, пока мы не договоримся о том как работать с сетью в приложении и разобьем этот файл на нормальные составляющие
import { IPasswordFormValues } from '../pages/Profile/types'

type TAwaitable<TReturn> = TReturn | Promise<TReturn>

type TQueryState<TQueryData> = {
  data: TQueryData | undefined
  error: Error | undefined
  successful: boolean
}

const UNKNOWN_ERROR_MESSAGE = 'Неизвестная ошибка'

export class User {
  private _entrypoint = 'https://ya-praktikum.tech/api/v2/user'

  private static _instance = new User()

  private constructor() {
    if (User._instance) {
      return User._instance
    }

    User._instance = this

    return this
  }

  static getInstance() {
    return User._instance
  }

  private _getRequestInitParams(
    params: {
      method?: string
      body?: BodyInit // FormData, string, Blob и т.д.
    } = {}
  ): RequestInit {
    const { method = 'GET', body } = params

    const requestInitParams: RequestInit = {
      headers: {}, // Не добавляем Content-Type для FormData, браузер сделает это автоматически
      credentials: 'include',
      method,
      body,
    }

    // Если тело есть и это не FormData, добавляем заголовки для JSON
    if (body && !(body instanceof FormData)) {
      requestInitParams.headers = {
        'Content-Type': 'application/json',
      }
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

      // Обработка ошибок по статусам
      if (response.status === 400) {
        const { reason } = await response.json()
        throw new Error(reason || UNKNOWN_ERROR_MESSAGE)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const dataText = await response.text()

      // Попытка парсинга JSON или присвоение текста как есть
      try {
        state.data = JSON.parse(dataText)
      } catch {
        state.data = dataText as unknown as TQueryData
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

  updateAvatar(body: FormData) {
    return this._getResponseData(() =>
      fetch(
        `${this._entrypoint}/profile/avatar`,
        this._getRequestInitParams({ method: 'PUT', body })
      )
    )
  }
  updatePassword(data: IPasswordFormValues) {
    return this._getResponseData(() =>
      fetch(
        `${this._entrypoint}/password`,
        this._getRequestInitParams({
          method: 'PUT',
          body: JSON.stringify(data),
        }) // Передача FormData как есть
      )
    )
  }
}
