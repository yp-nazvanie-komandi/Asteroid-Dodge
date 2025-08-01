import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type TErrorWithReason = FetchBaseQueryError & {
  data: {
    reason: string
  }
}

export const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error
}

export const isFetchBaseQueryErrorWithReason = (
  error: unknown,
): error is TErrorWithReason => {
  return (
    isFetchBaseQueryError(error) &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data != null &&
    'reason' in error.data &&
    typeof error.data.reason === 'string'
  )
}
