/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
import type {
  GetApiV1ThemesApiResponse,
  GetApiV1ThemesApiArg,
  GetApiV1UsersThemeApiResponse,
  GetApiV1UsersThemeApiArg,
  PostApiV1UsersThemeApiResponse,
  PostApiV1UsersThemeApiArg,
  ThemeResponse,
  HttpErrorBody,
  AttachedThemeResponse,
  AttachThemeResponse,
  AttachThemeRequest,
} from './types'
import { asteroidDodgeAPI as api } from '../../base'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getApiV1Themes: build.query<
      GetApiV1ThemesApiResponse,
      GetApiV1ThemesApiArg
    >({
      query: queryArg => ({
        url: `/api/v1/themes`,
        params: {
          name: queryArg.name,
        },
      }),
    }),
    getApiV1UsersTheme: build.query<
      GetApiV1UsersThemeApiResponse,
      GetApiV1UsersThemeApiArg
    >({
      query: () => ({ url: `/api/v1/users/theme/` }),
    }),
    postApiV1UsersTheme: build.mutation<
      PostApiV1UsersThemeApiResponse,
      PostApiV1UsersThemeApiArg
    >({
      query: queryArg => ({
        url: `/api/v1/users/theme/`,
        method: 'POST',
        body: queryArg.attachThemeRequest,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as AsteroidDodgeAPI }
export const {
  useGetApiV1ThemesQuery,
  useLazyGetApiV1ThemesQuery,
  useGetApiV1UsersThemeQuery,
  useLazyGetApiV1UsersThemeQuery,
  usePostApiV1UsersThemeMutation,
} = injectedRtkApi
