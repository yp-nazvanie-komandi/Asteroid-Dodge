/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!

import { baseAPI as api } from '../base'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    postAuthSignup: build.mutation<
      PostAuthSignupApiResponse,
      PostAuthSignupApiArg
    >({
      query: queryArg => ({
        url: `/auth/signup`,
        method: 'POST',
        body: queryArg.signUpRequest,
      }),
    }),
    postAuthSignin: build.mutation<
      PostAuthSigninApiResponse,
      PostAuthSigninApiArg
    >({
      query: queryArg => ({
        url: `/auth/signin`,
        method: 'POST',
        body: queryArg.signInRequest,
      }),
    }),
    getAuthUser: build.query<GetAuthUserApiResponse, GetAuthUserApiArg>({
      query: () => ({ url: `/auth/user` }),
    }),
    postAuthLogout: build.mutation<
      PostAuthLogoutApiResponse,
      PostAuthLogoutApiArg
    >({
      query: () => ({ url: `/auth/logout`, method: 'POST' }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as AuthAPI }
export type PostAuthSignupApiResponse = /** status 200 Ok */ SignUpResponse
export type PostAuthSignupApiArg = {
  /** User data */
  signUpRequest: SignUpRequest
}
export type PostAuthSigninApiResponse = /** status 200 Ok */ string
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
export const {
  usePostAuthSignupMutation,
  usePostAuthSigninMutation,
  useGetAuthUserQuery,
  useLazyGetAuthUserQuery,
  usePostAuthLogoutMutation,
} = injectedRtkApi
