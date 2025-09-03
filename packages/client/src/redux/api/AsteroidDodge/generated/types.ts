/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
export type GetApiV1ThemesApiResponse =
  /** status 200 List of themes */ ThemeResponse[]
export type GetApiV1ThemesApiArg = {
  /** Name of the theme to filter by */
  name?: string
}
export type GetApiV1UsersThemeApiResponse =
  /** status 200 Theme attached to user */ AttachedThemeResponse
export type GetApiV1UsersThemeApiArg = void
export type PostApiV1UsersThemeApiResponse =
  /** status 200 Theme attached to user */ AttachThemeResponse
export type PostApiV1UsersThemeApiArg = {
  attachThemeRequest: AttachThemeRequest
}
export type ThemeResponse = {
  /** ID of the theme attached to the user */
  id: number
  /** Name of the theme attached to the user */
  name: string
}
export type HttpErrorBody = {
  /** Error message */
  error: string
}
export type AttachedThemeResponse = {
  /** ID of the theme attached to the user */
  id: number
  /** Name of the theme attached to the user */
  name: string
}
export type AttachThemeResponse = {
  /** ID of the theme attached to the user */
  id: number
  /** Name of the theme attached to the user */
  name: string
}
export type AttachThemeRequest = {
  /** Name of the theme to attach to the user */
  themeName: string
}
