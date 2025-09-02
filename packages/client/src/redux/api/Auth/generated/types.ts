/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
export type PostAuthSignupApiResponse = SignUpResponse
export type PostAuthSignupApiArg = {
  /** User data */
  signUpRequest: SignUpRequest
}
export type PostAuthSigninApiResponse = string
export type PostAuthSigninApiArg = {
  /** User data */
  signInRequest: SignInRequest
}
export type GetAuthUserApiResponse =
  /** status 200 An array of user info */ UserResponse
export type GetAuthUserApiArg = void
export type PostAuthLogoutApiResponse = unknown
export type PostAuthLogoutApiArg = void
export type SignUpResponse = {
  /** Created User ID */
  id: number
}
export type HttpErrorBody = {
  /** Error message */
  reason: string
}
export type SignUpRequest = {
  /** First name */
  first_name: string
  /** Second name */
  second_name: string
  /** User login - unique */
  login: string
  /** Email /^\S+@\S+$/ */
  email: string
  /** Password */
  password: string
  /** Phone /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/ */
  phone: string
}
export type SignInRequest = {
  /** User login */
  login: string
  /** Password */
  password: string
}
export type UserResponse = {
  /** User id */
  id: number
  /** First name */
  first_name: string
  /** Second name */
  second_name: string
  /** Display name */
  display_name: string
  /** User login - unique */
  login: string
  /** User email - unique */
  email: string
  /** User phone */
  phone: string
  /** Avatar */
  avatar: string
}
