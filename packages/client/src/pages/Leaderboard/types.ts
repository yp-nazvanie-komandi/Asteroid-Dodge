import type { LeaderboardRequest } from '../../redux/api/Leaderboard/generated/types'
import type { ColumnInstance } from 'react-table'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

export type DataValue = number | string | boolean | null | undefined
export type DataObject = Record<string, DataValue>

export type LeaderboardRow = {
  data?: DataObject
  score?: number | null
}

export type LeadersResponse<T> = T[] | { data: T[] } | { leaders: T[] }

export type RtkError = FetchBaseQueryError | SerializedError | undefined

export type UseLeaderboardQueryArgs = {
  teamName?: string
  ratingFieldName: string
  cursor: number
  limit: number
}

export type UseLeaderboardQueryResult<Row> = {
  trigger: () => Promise<LeadersResponse<Row>>
  data: LeadersResponse<Row> | undefined
  isLoading: boolean
  isError: boolean
  error: RtkError
}

export type ResizableColumn<D extends object> = ColumnInstance<D> & {
  canResize?: boolean
  getResizerProps?: () => Record<string, unknown>
  isResizing?: boolean
}

export type { LeaderboardRequest }
