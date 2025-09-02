import { UsersAPI as api } from '../generated/api'

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Auth'],
  endpoints: {
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

export { enhancedApi as UsersAPI }

export const {
  usePutUserProfileMutation,
  usePutUserProfileAvatarMutation,
  usePutUserPasswordMutation,
  usePostUserSearchMutation,
} = enhancedApi
