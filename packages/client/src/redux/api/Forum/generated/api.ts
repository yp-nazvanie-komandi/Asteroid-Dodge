/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
import type {
  GetApiV1ForumTopicsApiResponse,
  GetApiV1ForumTopicsApiArg,
  PostApiV1ForumTopicsApiResponse,
  PostApiV1ForumTopicsApiArg,
  GetApiV1ForumTopicsByIdApiResponse,
  GetApiV1ForumTopicsByIdApiArg,
  PostApiV1ForumTopicsByIdCommentsApiResponse,
  PostApiV1ForumTopicsByIdCommentsApiArg,
  Reaction,
  Reply,
  Comment,
  Topic,
  HttpErrorBody,
  CreateTopicRequest,
  CreateCommentRequest,
} from './types'
import { baseAPI as api } from '../../base'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getApiV1ForumTopics: build.query<
      GetApiV1ForumTopicsApiResponse,
      GetApiV1ForumTopicsApiArg
    >({
      query: () => ({ url: `/api/v1/forum/topics` }),
    }),
    postApiV1ForumTopics: build.mutation<
      PostApiV1ForumTopicsApiResponse,
      PostApiV1ForumTopicsApiArg
    >({
      query: queryArg => ({
        url: `/api/v1/forum/topics`,
        method: 'POST',
        body: queryArg.createTopicRequest,
      }),
    }),
    getApiV1ForumTopicsById: build.query<
      GetApiV1ForumTopicsByIdApiResponse,
      GetApiV1ForumTopicsByIdApiArg
    >({
      query: queryArg => ({ url: `/api/v1/forum/topics/${queryArg.id}` }),
    }),
    postApiV1ForumTopicsByIdComments: build.mutation<
      PostApiV1ForumTopicsByIdCommentsApiResponse,
      PostApiV1ForumTopicsByIdCommentsApiArg
    >({
      query: queryArg => ({
        url: `/api/v1/forum/topics/${queryArg.id}/comments`,
        method: 'POST',
        body: queryArg.createCommentRequest,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as ForumAPI }
export const {
  useGetApiV1ForumTopicsQuery,
  useLazyGetApiV1ForumTopicsQuery,
  usePostApiV1ForumTopicsMutation,
  useGetApiV1ForumTopicsByIdQuery,
  useLazyGetApiV1ForumTopicsByIdQuery,
  usePostApiV1ForumTopicsByIdCommentsMutation,
} = injectedRtkApi
