import type { HttpErrorBody } from '../../redux/api/Leaderboard/generated/types'
import { LeadersResponse } from './types'

export function hasDataArray<T>(x: unknown): x is { data: T[] } {
  return (
    typeof x === 'object' &&
    x !== null &&
    Array.isArray((x as { data?: unknown }).data)
  )
}
export function hasLeadersArray<T>(x: unknown): x is { leaders: T[] } {
  return (
    typeof x === 'object' &&
    x !== null &&
    Array.isArray((x as { leaders?: unknown }).leaders)
  )
}
export function extractRows<T>(resp: LeadersResponse<T>): T[] {
  if (Array.isArray(resp)) return resp
  if (hasDataArray<T>(resp)) return resp.data
  if (hasLeadersArray<T>(resp)) return resp.leaders
  return []
}

export function getErrorMessage(err: unknown): string {
  if (err && typeof err === 'object') {
    const e = err as { data?: HttpErrorBody; error?: string }
    return String(e.data?.reason ?? e.error ?? 'Error')
  }
  return 'Error'
}
