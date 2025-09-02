import { AuthAPI as api } from '../generated/api'

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Auth'],
  endpoints: {
    getAuthUser: {
      providesTags: ['Auth'],
    },
    postAuthSignin: {
      invalidatesTags: ['Auth'],
    },
    postAuthLogout: {
      invalidatesTags: ['Auth'],
    },
  },
})

export { enhancedApi as AuthAPI }

export const {
  usePostAuthSignupMutation,
  usePostAuthSigninMutation,
  useGetAuthUserQuery,
  useLazyGetAuthUserQuery,
  usePostAuthLogoutMutation,
} = enhancedApi
