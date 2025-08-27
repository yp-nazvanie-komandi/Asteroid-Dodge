import { useEffect, useMemo } from 'react'
import { usePostLeaderboardMutation } from '../../redux/api/Leaderboard/generated/api'
import { ASTEROID_DODGE_SCORE, TEAM_NAME } from '../../utils/constants'

export type GameResultPayload = {
  countPoints: number
}

export function useSubmitGameResultRtk(
  payload: GameResultPayload | null,
  { auto = true }: { auto?: boolean } = {},
) {
  const [submit, { isLoading, isSuccess, error, reset }] =
    usePostLeaderboardMutation()

  const body = useMemo(
    () =>
      payload
        ? {
            leaderboardNewLeaderRequest: {
              data: {
                payload,
              },
              ratingFieldName: ASTEROID_DODGE_SCORE,
              teamName: TEAM_NAME,
            },
          }
        : null,
    [payload],
  )

  useEffect(() => {
    if (auto && body) {
      submit(body).catch(error => {
        console.log(error)
      })
    }
  }, [auto, body, submit])

  return {
    isSubmitting: isLoading,
    isSuccess,
    error,
    submit: body ? () => submit(body).unwrap() : () => Promise.reject(),
    reset,
  }
}
