import { baseAPI as api } from './base'

export const enhancedAPI = api.enhanceEndpoints({
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
    putUserProfile: {
      invalidatesTags: ['Auth'],
    },
    putUserProfileAvatar: {
      invalidatesTags: ['Auth'],
    },
    putUserPassword: {
      invalidatesTags: ['Auth'],
    },
  },
})
