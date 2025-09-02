/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
export type PutUserProfileApiResponse = UserResponse
export type PutUserProfileApiArg = {
  /** User data */
  userUpdateRequest: UserUpdateRequest
}
export type PutUserProfileAvatarApiResponse = UserResponse
export type PutUserProfileAvatarApiArg = {
  profileAvatarBody: ProfileAvatarBody
}
export type PutUserPasswordApiResponse = string
export type PutUserPasswordApiArg = {
  /** Password request */
  changePasswordRequest: ChangePasswordRequest
}
export type PostUserSearchApiResponse = UserResponse[]
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
