import React from 'react'
import {
  useTable,
  useResizeColumns,
  useBlockLayout,
  Column,
  CellProps,
  TableInstance,
} from 'react-table'
import { useLeaderboardQuery } from './useLeaderboardRtk'
import Pagination from './LeaderboardPagination'
import { LeaderboardRow, ResizableColumn } from '../../pages/Leaderboard/types'
import { extractRows, getErrorMessage } from '../../pages/Leaderboard/utils'

export default function LeaderboardTable({
  ratingFieldName,
  initialPageSize = 10,
}: {
  ratingFieldName: string
  initialPageSize?: number
}) {
  const [pageIndex, setPageIndex] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(initialPageSize)
  const [rows, setRows] = React.useState<LeaderboardRow[]>([])
  const [knownLastPage, setKnownLastPage] = React.useState<number | null>(null)

  React.useEffect(() => {
    setKnownLastPage(null)
    setPageIndex(0)
  }, [pageSize, ratingFieldName])

  const cursor = pageIndex * pageSize

  const { trigger, isLoading, isError, error } = useLeaderboardQuery({
    ratingFieldName,
    cursor,
    limit: pageSize,
  })

  const seqRef = React.useRef(0)

  React.useEffect(() => {
    let active = true
    const seq = ++seqRef.current
    ;(async () => {
      try {
        const resp = await trigger()
        if (!active || seq !== seqRef.current) return
        const list = extractRows<LeaderboardRow>(resp)
        setRows(list)
        if (list.length < pageSize) {
          setKnownLastPage(prev =>
            prev === null ? pageIndex : Math.max(prev, pageIndex),
          )
        }
      } catch {
        if (active && seq === seqRef.current) setRows([])
      }
    })()
    return () => {
      active = false
      seqRef.current++
    }
  }, [ratingFieldName, cursor, pageSize])

  const getScore = React.useCallback(
    (r: LeaderboardRow): number => {
      const v = r.data?.[ratingFieldName]
      if (typeof v === 'number') return v
      if (typeof v === 'string') {
        const n = Number(v)
        return Number.isFinite(n) ? n : 0
      }
      if (typeof r.score === 'number') return r.score
      return 0
    },
    [ratingFieldName],
  )

  const columns = React.useMemo<Column<LeaderboardRow>[]>(
    () => [
      {
        Header: '#',
        id: 'rank',
        width: 80,
        minWidth: 60,
        maxWidth: 120,
        accessor: (_row: LeaderboardRow, i: number) => cursor + i + 1,
      },
      {
        Header: 'Score',
        id: 'score',
        width: 300,
        minWidth: 140,
        maxWidth: 600,
        accessor: (r: LeaderboardRow) => getScore(r),
        Cell: ({ value }: CellProps<LeaderboardRow, number>) =>
          Number.isFinite(value) ? value.toLocaleString() : '0',
      },
    ],
    [cursor, getScore],
  )

  const defaultColumn = React.useMemo(
    () => ({ minWidth: 50, width: 150, maxWidth: 1000 }),
    [],
  )

  const table = useTable<LeaderboardRow>(
    { columns, data: rows, defaultColumn },
    useBlockLayout,
    useResizeColumns,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows: rtRows,
  } = table as TableInstance<LeaderboardRow>

  const start = rows.length === 0 ? 0 : cursor + 1
  const end = cursor + Math.min(pageSize, rows.length)

  const canPreviousPage = pageIndex > 0
  const canNextPage =
    knownLastPage === null
      ? rows.length === pageSize
      : pageIndex < knownLastPage

  const gotoPage = (n: number) => setPageIndex(Math.max(0, n))

  return (
    <div className="lb-wrapper">
      {(() => {
        const tableProps = getTableProps() as any
        const { key: tableKey, ...tableRest } = tableProps
        return (
          <div {...tableRest} key={tableKey} className="lb-table">
            {headerGroups.map(hg => {
              const { key: hgKey, ...hgRest } = hg.getHeaderGroupProps() as any
              return (
                <div {...hgRest} key={hgKey} className="lb-header-row">
                  {hg.headers.map(h => {
                    const column = h as ResizableColumn<LeaderboardRow>
                    const { key: hKey, ...hRest } =
                      column.getHeaderProps() as any
                    return (
                      <div {...hRest} key={hKey} className="lb-th">
                        {column.render('Header')}
                        {column.canResize &&
                          column.getResizerProps &&
                          (() => {
                            const resizerProps = column.getResizerProps()
                            const { key: resKey, ...resRest } = (resizerProps ||
                              {}) as any
                            return (
                              <div
                                {...resRest}
                                key={resKey}
                                className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                                title="Drag to resize"
                              />
                            )
                          })()}
                      </div>
                    )
                  })}
                </div>
              )
            })}
            {(() => {
              const bodyProps = getTableBodyProps() as any
              const { key: bodyKey, ...bodyRest } = bodyProps
              return (
                <div {...bodyRest} key={bodyKey}>
                  {isLoading && <div className="lb-empty">Loading…</div>}
                  {isError && (
                    <div className="lb-empty lb-error-text">
                      {getErrorMessage(error)}
                    </div>
                  )}
                  {!isLoading &&
                    !isError &&
                    rtRows.map(row => {
                      prepareRow(row)
                      const { key: rowKey, ...rowRest } =
                        row.getRowProps() as any
                      return (
                        <div {...rowRest} key={rowKey} className="lb-row">
                          {row.cells.map(cell => {
                            const { key: cellKey, ...cellRest } =
                              cell.getCellProps() as any
                            return (
                              <div
                                {...cellRest}
                                key={cellKey}
                                className="lb-td"
                              >
                                {cell.render('Cell')}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  {!isLoading && !isError && rows.length === 0 && (
                    <div className="lb-empty">No data</div>
                  )}
                </div>
              )
            })()}
          </div>
        )
      })()}

      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        start={start}
        end={end}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        knownLastPage={knownLastPage}
        onPrev={() => canPreviousPage && setPageIndex(i => i - 1)}
        onNext={() => canNextPage && setPageIndex(i => i + 1)}
        onPageSize={(size: number) => setPageSize(size)}
        onGotoPage={gotoPage}
      />
    </div>
  )
}
