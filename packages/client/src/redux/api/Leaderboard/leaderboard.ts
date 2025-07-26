/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!

import { baseAPI as api } from '../base'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    postLeaderboard: build.mutation<
      PostLeaderboardApiResponse,
      PostLeaderboardApiArg
    >({
      query: queryArg => ({
        url: `/leaderboard`,
        method: 'POST',
        body: queryArg.leaderboardNewLeaderRequest,
      }),
    }),
    postLeaderboardAll: build.mutation<
      PostLeaderboardAllApiResponse,
      PostLeaderboardAllApiArg
    >({
      query: queryArg => ({
        url: `/leaderboard/all`,
        method: 'POST',
        body: queryArg.leaderboardRequest,
      }),
    }),
    postLeaderboardByTeamName: build.mutation<
      PostLeaderboardByTeamNameApiResponse,
      PostLeaderboardByTeamNameApiArg
    >({
      query: queryArg => ({
        url: `/leaderboard/${queryArg.teamName}`,
        method: 'POST',
        body: queryArg.leaderboardRequest,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as LeaderboardAPI }
export type PostLeaderboardApiResponse = /** status 200 Ok */ string
export type PostLeaderboardApiArg = {
  /** Leader data */
  leaderboardNewLeaderRequest: LeaderboardNewLeaderRequest
}
export type PostLeaderboardAllApiResponse = unknown
export type PostLeaderboardAllApiArg = {
  /** Leaderboard request */
  leaderboardRequest: LeaderboardRequest
}
export type PostLeaderboardByTeamNameApiResponse = unknown
export type PostLeaderboardByTeamNameApiArg = {
  /** Name of the team, which leaderboard you want to get */
  teamName: any
  /** Leaderboard request. Cursor is used for pagination. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10. */
  leaderboardRequest: LeaderboardRequest
}
export type HttpErrorBody = {
  /** Error message */
  reason: string
}
export type LeaderboardNewLeaderRequest = {
  /** Leaderboard data object, any type */
  data: {}
  /** Which field is used to sort (if new value of the field more than old, data is stored) */
  ratingFieldName: string
  /** Your team name. Used to make unique leaderboard for each project. */
  teamName?: string
}
export type LeaderboardRequest = {
  /** Which field is used to sort */
  ratingFieldName: string
  /** Used to paginate between pages. If limit is 10, then for the 1st page - cursor=0, for the 2nd page - cursor=10. */
  cursor: number
  /** Maximum amount of leaders to return */
  limit: number
}
export const {
  usePostLeaderboardMutation,
  usePostLeaderboardAllMutation,
  usePostLeaderboardByTeamNameMutation,
} = injectedRtkApi
