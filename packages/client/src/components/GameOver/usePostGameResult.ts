import { useEffect, useMemo, useRef } from 'react'
import { usePostLeaderboardMutation } from '../../redux/api/Leaderboard/generated/api'
import { ASTEROID_DODGE_SCORE, TEAM_NAME } from '../../utils/constants'

export function useSubmitGameResultRtk(
  countPoints: number | null,
  { auto = true }: { auto?: boolean } = {},
) {
  const [submitMutation, { isLoading, isSuccess, error, reset }] =
    usePostLeaderboardMutation()

  const body = useMemo(() => {
    if (countPoints == null) return null

    return {
      leaderboardNewLeaderRequest: {
        data: { [ASTEROID_DODGE_SCORE]: countPoints },
        ratingFieldName: ASTEROID_DODGE_SCORE,
        teamName: 'test',
      },
    }
  }, [countPoints])

  const lastSentRef = useRef<number | null>(null)

  useEffect(() => {
    if (!auto || !body) return
    if (lastSentRef.current === countPoints) return
    lastSentRef.current = countPoints!
    submitMutation(body).catch(console.error)
  }, [auto, body, countPoints, submitMutation])

  const submit = body
    ? () => submitMutation(body).unwrap()
    : () => Promise.reject(new Error('Score is null, nothing to submit'))

  return {
    isSubmitting: isLoading,
    isSuccess,
    error,
    submit,
    reset,
  }
}
