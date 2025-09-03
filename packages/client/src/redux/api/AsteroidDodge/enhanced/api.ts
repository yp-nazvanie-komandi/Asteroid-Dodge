import { AsteroidDodgeAPI as api } from '../generated/api'

const enhancedApi = api

export { enhancedApi as AsteroidDodgeAPI }

export const {
  useGetApiV1ThemesQuery,
  useLazyGetApiV1ThemesQuery,
  useGetApiV1UsersThemeQuery,
  useLazyGetApiV1UsersThemeQuery,
  usePostApiV1UsersThemeMutation,
  util: { getRunningQueriesThunk },
} = enhancedApi

export const { getApiV1Themes, getApiV1UsersTheme } = enhancedApi.endpoints
