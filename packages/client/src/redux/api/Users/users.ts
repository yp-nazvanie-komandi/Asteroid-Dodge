/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!

import { baseAPI as api } from '../base'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    putUserProfile: build.mutation<
      PutUserProfileApiResponse,
      PutUserProfileApiArg
    >({
      query: queryArg => ({
        url: `/user/profile`,
        method: 'PUT',
        body: queryArg.userUpdateRequest,
      }),
    }),
    putUserProfileAvatar: build.mutation<
      PutUserProfileAvatarApiResponse,
      PutUserProfileAvatarApiArg
    >({
      query: queryArg => ({
        url: `/user/profile/avatar`,
        method: 'PUT',
        body: queryArg.profileAvatarBody,
      }),
    }),
    putUserPassword: build.mutation<
      PutUserPasswordApiResponse,
      PutUserPasswordApiArg
    >({
      query: queryArg => ({
        url: `/user/password`,
        method: 'PUT',
        body: queryArg.changePasswordRequest,
      }),
    }),
    postUserSearch: build.mutation<
      PostUserSearchApiResponse,
      PostUserSearchApiArg
    >({
      query: queryArg => ({
        url: `/user/search`,
        method: 'POST',
        body: queryArg.findUserRequest,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as UsersAPI }
export type PutUserProfileApiResponse = /** status 200 Ok */ UserResponse
export type PutUserProfileApiArg = {
  /** User data */
  userUpdateRequest: UserUpdateRequest
}
export type PutUserProfileAvatarApiResponse = /** status 200 Ok */ UserResponse
export type PutUserProfileAvatarApiArg = {
  profileAvatarBody: ProfileAvatarBody
}
export type PutUserPasswordApiResponse = /** status 200 Ok */ string
export type PutUserPasswordApiArg = {
  /** Password request */
  changePasswordRequest: ChangePasswordRequest
}
export type PostUserSearchApiResponse = /** status 200 Ok */ UserResponse[]
export type PostUserSearchApiArg = {
  /** User data */
  findUserRequest: FindUserRequest
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
export type HttpErrorBody = {
  /** Error message */
  reason: string
}
export type UserUpdateRequest = {
  /** First name */
  first_name?: string
  /** Second name */
  second_name?: string
  /** Display Name */
  display_name?: string
  /** User login - unique */
  login?: string
  /** Email */
  email?: string
  /** Phone */
  phone?: string
}
export type ProfileAvatarBody = {
  /** Avatar (JPEG, JPG, PNG, GIF, WebP are allowed) */
  avatar: Blob
}
export type ChangePasswordRequest = {
  /** Old password */
  oldPassword: string
  /** New password */
  newPassword: string
}
export type FindUserRequest = {
  /** User login (beginning of login) */
  login: string
}
export const {
  usePutUserProfileMutation,
  usePutUserProfileAvatarMutation,
  usePutUserPasswordMutation,
  usePostUserSearchMutation,
} = injectedRtkApi
