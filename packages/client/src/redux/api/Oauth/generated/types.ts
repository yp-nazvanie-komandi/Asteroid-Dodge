/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
export type PostOauthYandexApiResponse = string
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
