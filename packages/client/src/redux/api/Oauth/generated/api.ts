/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
import type {
  PostOauthYandexApiResponse,
  PostOauthYandexApiArg,
  GetOauthYandexServiceIdApiResponse,
  GetOauthYandexServiceIdApiArg,
  HttpErrorBody,
  OauthSignInRequest,
  ServiceId,
} from './types'
import { baseAPI as api } from '../../base'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    postOauthYandex: build.mutation<
      PostOauthYandexApiResponse,
      PostOauthYandexApiArg
    >({
      query: queryArg => ({
        url: `/oauth/yandex`,
        method: 'POST',
        body: queryArg.oauthSignInRequest,
      }),
    }),
    getOauthYandexServiceId: build.query<
      GetOauthYandexServiceIdApiResponse,
      GetOauthYandexServiceIdApiArg
    >({
      query: queryArg => ({
        url: `/oauth/yandex/service-id`,
        params: {
          redirect_uri: queryArg.redirectUri,
        },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as OauthAPI }
export const {
  usePostOauthYandexMutation,
  useGetOauthYandexServiceIdQuery,
  useLazyGetOauthYandexServiceIdQuery,
} = injectedRtkApi
