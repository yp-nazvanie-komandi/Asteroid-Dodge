/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
import type {
  PostLeaderboardApiResponse,
  PostLeaderboardApiArg,
  PostLeaderboardAllApiResponse,
  PostLeaderboardAllApiArg,
  PostLeaderboardByTeamNameApiResponse,
  PostLeaderboardByTeamNameApiArg,
  HttpErrorBody,
  LeaderboardNewLeaderRequest,
  LeaderboardRequest,
} from './types'
import { baseAPI as api } from '../../base'
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
export const {
  usePostLeaderboardMutation,
  usePostLeaderboardAllMutation,
  usePostLeaderboardByTeamNameMutation,
} = injectedRtkApi
