/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
export type PostLeaderboardApiResponse = string
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
