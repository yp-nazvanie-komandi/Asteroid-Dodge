import { OauthAPI as api } from '../generated/api'

const enhancedApi = api.enhanceEndpoints({
  addTagTypes: ['Auth'],
  endpoints: {
    postOauthYandex: {
      invalidatesTags: ['Auth'],
    },
  },
})

export { enhancedApi as OauthAPI }

export const {
  usePostOauthYandexMutation,
  useGetOauthYandexServiceIdQuery,
  useLazyGetOauthYandexServiceIdQuery,
} = enhancedApi
