import { useCallback } from 'react'
import {
  usePostLeaderboardAllMutation,
  usePostLeaderboardByTeamNameMutation,
} from '../../redux/api/Leaderboard/generated/api'
import type { LeaderboardRequest } from '../../redux/api/Leaderboard/generated/types'
import {
  LeaderboardRow,
  LeadersResponse,
  RtkError,
  UseLeaderboardQueryArgs,
  UseLeaderboardQueryResult,
} from '../../pages/Leaderboard/types'
export function useLeaderboardQuery<
  Row extends LeaderboardRow = LeaderboardRow,
>({
  teamName,
  ratingFieldName,
  cursor,
  limit,
}: UseLeaderboardQueryArgs): UseLeaderboardQueryResult<Row> {
  const [fetchAll, allState] = usePostLeaderboardAllMutation()
  const [fetchTeam, teamState] = usePostLeaderboardByTeamNameMutation()

  const trigger = useCallback<() => Promise<LeadersResponse<Row>>>(async () => {
    const body: LeaderboardRequest = { ratingFieldName, cursor, limit }
    if (teamName) {
      const res = await fetchTeam({
        teamName,
        leaderboardRequest: body,
      }).unwrap()
      return res as LeadersResponse<Row>
    }
    const res = await fetchAll({ leaderboardRequest: body }).unwrap()
    return res as LeadersResponse<Row>
  }, [teamName, ratingFieldName, cursor, limit, fetchAll, fetchTeam])

  const isLoading = allState.isLoading || teamState.isLoading
  const isError = allState.isError || teamState.isError
  const error: RtkError = (allState.error ?? teamState.error) as RtkError
  const data = (teamName ? teamState.data : allState.data) as
    | LeadersResponse<Row>
    | undefined

  return {
    trigger,
    data,
    isLoading,
    isError,
    error,
  }
}
