import React from 'react'
import { useTable, useResizeColumns, useBlockLayout } from 'react-table'
import { useLeaderboardQuery } from './useLeaderboardRtk'
import Pagination from './LeaderboardPagination'

export type LeaderboardRow = any

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
  }, [pageSize])

  const cursor = pageIndex * pageSize
  const { trigger, isLoading, isError, error } = useLeaderboardQuery({
    ratingFieldName,
    cursor,
    limit: pageSize,
  })

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data: any = await trigger()
        const list: any[] = Array.isArray(data)
          ? data
          : (data?.leaders ?? data?.data ?? [])
        if (!cancelled) {
          setRows(list)
          if (list.length < pageSize) {
            setKnownLastPage(prev =>
              prev === null ? pageIndex : Math.max(prev, pageIndex),
            )
          }
        }
      } catch {
        if (!cancelled) setRows([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [trigger, pageIndex, pageSize])

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: (_: any, i: number) => cursor + i + 1,
        id: 'rank',
        width: 60,
        minWidth: 50,
        maxWidth: 80,
      },
      {
        Header: 'Player',
        accessor: (r: any) => r?.data?.myField ?? r?.data?.name ?? '—',
        id: 'player',
        width: 462,
        minWidth: 180,
        maxWidth: 700,
        Cell: ({ value }: any) => (
          <div className="truncate">{String(value)}</div>
        ),
      },
      {
        Header: 'Wins',
        accessor: (r: any) => r?.data?.wins ?? '—',
        id: 'wins',
        width: 120,
        minWidth: 80,
        maxWidth: 240,
      },
      {
        Header: 'Score',
        accessor: (r: any) => r?.data?.otherField ?? r?.score ?? 0,
        id: 'score',
        width: 342,
        minWidth: 120,
        maxWidth: 500,
        Cell: ({ value }: any) => Number(value).toLocaleString(),
      },
    ],
    [cursor],
  )

  const defaultColumn = React.useMemo(
    () => ({ minWidth: 50, width: 150, maxWidth: 1000 }),
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows: rtRows,
  } = useTable(
    { columns, data: rows, defaultColumn },
    useBlockLayout,
    useResizeColumns,
  )

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
      <div {...getTableProps()} className="lb-table">
        {headerGroups.map(hg => (
          <div {...hg.getHeaderGroupProps()} className="lb-header-row">
            {hg.headers.map(column => (
              <div {...column.getHeaderProps()} className="lb-th">
                {column.render('Header')}
                {(column as any).canResize && (
                  <div
                    {...(column as any).getResizerProps?.()}
                    className={`resizer ${(column as any).isResizing ? 'isResizing' : ''}`}
                    title="Drag to resize"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <div {...getTableBodyProps()}>
          {isLoading && <div className="lb-empty">Loading…</div>}
          {isError && (
            <div className="lb-empty lb-error-text">
              {String(
                (error as any)?.data?.reason ||
                  (error as any)?.error ||
                  'Error',
              )}
            </div>
          )}
          {!isLoading &&
            !isError &&
            rtRows.map(row => {
              prepareRow(row)
              return (
                <div {...row.getRowProps()} className="lb-row">
                  {row.cells.map(cell => (
                    <div {...cell.getCellProps()} className="lb-td">
                      {cell.render('Cell')}
                    </div>
                  ))}
                </div>
              )
            })}
          {!isLoading && !isError && rows.length === 0 && (
            <div className="lb-empty">No data</div>
          )}
        </div>
      </div>
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
        onPageSize={size => setPageSize(size)}
        onGotoPage={gotoPage}
      />
    </div>
  )
}
