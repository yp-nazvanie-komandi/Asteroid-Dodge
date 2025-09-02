/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
import type {
  PutUserProfileApiResponse,
  PutUserProfileApiArg,
  PutUserProfileAvatarApiResponse,
  PutUserProfileAvatarApiArg,
  PutUserPasswordApiResponse,
  PutUserPasswordApiArg,
  PostUserSearchApiResponse,
  PostUserSearchApiArg,
  UserResponse,
  HttpErrorBody,
  UserUpdateRequest,
  ProfileAvatarBody,
  ChangePasswordRequest,
  FindUserRequest,
} from './types'
import { baseAPI as api } from '../../base'
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
export const {
  usePutUserProfileMutation,
  usePutUserProfileAvatarMutation,
  usePutUserPasswordMutation,
  usePostUserSearchMutation,
} = injectedRtkApi
