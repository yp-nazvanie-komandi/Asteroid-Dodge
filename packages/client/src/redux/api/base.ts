import { createApi } from '@reduxjs/toolkit/query/react'

import { fetchBaseQueryModified } from './fetcher'

const apiBaseUrlResolver = (isYp: boolean) => {
  if (__API_MODE__ === 'ssr' || import.meta.env.SSR) {
    return isYp ? __SSR_YP_API_BASE_URL__ : __SSR_ASTEROID_DODGE_API_BASE_URL__
  }

  return isYp ? __YP_API_BASE_URL__ : __ASTEROID_DODGE_API_BASE_URL__
}

// TODO: Заменить на axios или другой HTTP-клиент
const apiFetcherWrapper = (isYp: boolean) => {
  return fetchBaseQueryModified({
    baseUrl: apiBaseUrlResolver(isYp),
    credentials: 'include',
    prepareHeaders: (headers, api) => {
      const modified = new Headers(headers)

      const extraArg = api.extra as ISSRServerContext | undefined

      if (Array.isArray(extraArg?.request?.cookies)) {
        modified.append('Cookie', extraArg.request.cookies.join('; '))
      }

      return modified
    },
    responseHandler: async (response, api) => {
      const extraArg = api.extra as ISSRServerContext | undefined

      if (extraArg?.response) {
        /*
        Пример содержимого cookiesFromResponse:
        [
        'uuid=d6e05106-6086-4308-a3ca-17dd96d9e741; Path=/; Expires=Tue, 16 Sep 2025 13:39:11 GMT; HttpOnly; Secure; SameSite=None',
        'authCookie=; Path=/; Expires=Thu, 27 Feb 2025 19:21:05 GMT; HttpOnly; Secure; SameSite=None',
        ]
        */
        const cookiesFromResponse = response.headers.getSetCookie()

        if (cookiesFromResponse.length) {
          if (!Array.isArray(extraArg.response.cookies)) {
            extraArg.response.cookies = []
          }

          for (const cookie of cookiesFromResponse) {
            extraArg.response.cookies.push(cookie)
          }
        }
      }

      const text = await response.text()

      try {
        return JSON.parse(text)
      } catch {
        return text
      }
    },
  })
}

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: apiFetcherWrapper(true),
  endpoints: () => ({}),
})

export const asteroidDodgeAPI = createApi({
  reducerPath: 'asteroidDodgeAPI',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/' }),
  baseQuery: apiFetcherWrapper(false),
  endpoints: () => ({}),
  // endpoints: builder => ({
  //   getUserTheme: builder.query<AttachedThemeResponse, void>({
  //     query: () => 'users/theme/',
  //   }),
  //   updateUserTheme: builder.mutation({
  //     query: newTheme => ({
  //       url: 'users/theme/',
  //       credentials: 'include',
  //       method: 'POST', // или 'POST', если API так требует
  //       body: JSON.stringify({ theme: newTheme }),
  //     }),
  //   }),
  // }),
})

// export const { useGetUserThemeQuery, useUpdateUserThemeMutation } = userAPI
