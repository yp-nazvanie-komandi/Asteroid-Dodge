import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AttachedThemeResponse } from '../../components/Theme/change-theme-drop'

export const baseAPI = createApi({
  reducerPath: 'API',
  // TODO: Заменить на axios или другой HTTP-клиент
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2',
    credentials: 'include',
    responseHandler: async response => {
      const text = await response.text()

      try {
        return JSON.parse(text)
      } catch {
        return text
      }
    },
  }),
  endpoints: () => ({}),
})

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/' }),
  endpoints: builder => ({
    getUserTheme: builder.query<AttachedThemeResponse, void>({
      query: () => 'users/theme/',
    }),
    updateUserTheme: builder.mutation({
      query: newTheme => ({
        url: 'users/theme/',
        credentials: 'include',
        method: 'POST', // или 'POST', если API так требует
        body: JSON.stringify({ theme: newTheme }),
      }),
    }),
  }),
})

export const { useGetUserThemeQuery, useUpdateUserThemeMutation } = userAPI
