import type {
  GetApiV1ForumTopicsApiResponse,
  Topic,
} from '../../../redux/api/Forum/generated/types'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
  QueryDefinition,
} from '@reduxjs/toolkit/query'

export type TForumTopicProps = Topic & {
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      void,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        NonNullable<unknown>,
        FetchBaseQueryMeta
      >,
      never,
      GetApiV1ForumTopicsApiResponse,
      'asteroidDodgeAPI',
      unknown
    >
  >
}
