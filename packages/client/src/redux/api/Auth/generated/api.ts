/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
import type {
  PostAuthSignupApiResponse,
  PostAuthSignupApiArg,
  PostAuthSigninApiResponse,
  PostAuthSigninApiArg,
  GetAuthUserApiResponse,
  GetAuthUserApiArg,
  PostAuthLogoutApiResponse,
  PostAuthLogoutApiArg,
  SignUpResponse,
  HttpErrorBody,
  SignUpRequest,
  SignInRequest,
  UserResponse,
} from './types'
import { baseAPI as api } from '../../base'
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
export const {
  usePostAuthSignupMutation,
  usePostAuthSigninMutation,
  useGetAuthUserQuery,
  useLazyGetAuthUserQuery,
  usePostAuthLogoutMutation,
} = injectedRtkApi
