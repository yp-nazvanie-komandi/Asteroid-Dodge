import { useCallback } from 'react'
import {
  usePostLeaderboardAllMutation,
  usePostLeaderboardByTeamNameMutation,
} from '../../redux/api/Leaderboard/generated/api'

export function useLeaderboardQuery({
  teamName,
  ratingFieldName,
  cursor,
  limit,
}: {
  teamName?: string
  ratingFieldName: string
  cursor: number
  limit: number
}) {
  const [fetchAll, allState] = usePostLeaderboardAllMutation()
  const [fetchTeam, teamState] = usePostLeaderboardByTeamNameMutation()

  const trigger = useCallback(async () => {
    if (teamName) {
      return fetchTeam({
        teamName,
        leaderboardRequest: { ratingFieldName, cursor, limit },
      }).unwrap()
    }
    return fetchAll({
      leaderboardRequest: { ratingFieldName, cursor, limit },
    }).unwrap()
  }, [teamName, ratingFieldName, cursor, limit, fetchAll, fetchTeam])

  const isLoading = allState.isLoading || teamState.isLoading
  const isError = allState.isError || teamState.isError
  const error = allState.error || teamState.error
  const data = teamName ? teamState.data : allState.data

  return {
    trigger,
    data,
    isLoading,
    isError,
    error,
  }
}
