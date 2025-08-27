import React from 'react'

function range(from: number, to: number) {
  const out: number[] = []
  for (let i = from; i <= to; i++) out.push(i)
  return out
}

export default function Pagination({
  pageIndex,
  pageSize,
  start,
  end,
  canPreviousPage,
  canNextPage,
  knownLastPage,
  onPrev,
  onNext,
  onPageSize,
  onGotoPage,
}: {
  pageIndex: number
  pageSize: number
  start: number
  end: number
  canPreviousPage: boolean
  canNextPage: boolean
  knownLastPage: number | null
  onPrev: () => void
  onNext: () => void
  onPageSize: (n: number) => void
  onGotoPage: (n: number) => void
}) {
  const windowSize = 5
  let first = Math.max(0, pageIndex - Math.floor(windowSize / 2))
  let last = first + windowSize - 1

  if (knownLastPage !== null) {
    last = Math.min(knownLastPage, last)
    first = Math.max(0, Math.min(first, knownLastPage + 1 - windowSize))
  } else {
    last = Math.min(Math.max(last, pageIndex + 1), pageIndex + 1)
  }

  const pages = range(first, Math.max(first, last))

  return (
    <div className="lb-footer">
      <div className="lb-rows-per-page">
        <span className="lb-caption">Записей на странице:</span>
        <div className="lb-select-wrap">
          <select
            value={pageSize}
            onChange={e => onPageSize(Number(e.target.value))}
          >
            {[10, 30, 50].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <div className="lb-caret" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>

      <span className="lb-range">
        {start}-{end}
      </span>

      <div className="lb-nav">
        <button
          className="lb-icon-btn"
          onClick={() => onGotoPage(0)}
          disabled={!canPreviousPage}
          aria-label="First page"
        >
          «
        </button>
        <button
          className="lb-icon-btn"
          onClick={onPrev}
          disabled={!canPreviousPage}
          aria-label="Previous page"
        >
          ‹
        </button>

        {first > 0 && (
          <button className="lb-page-btn" onClick={() => onGotoPage(0)}>
            1
          </button>
        )}
        {first > 1 && <span className="lb-caption">…</span>}

        {pages.map(p => (
          <button
            key={p}
            className={`lb-page-btn ${p === pageIndex ? 'is-active' : ''}`}
            onClick={() => onGotoPage(p)}
            disabled={knownLastPage === null && p > pageIndex + 1}
          >
            {p + 1}
          </button>
        ))}

        {knownLastPage !== null && knownLastPage > last && (
          <span className="lb-caption">…</span>
        )}
        {knownLastPage !== null && knownLastPage > last && (
          <button
            className="lb-page-btn"
            onClick={() => onGotoPage(knownLastPage)}
          >
            {knownLastPage + 1}
          </button>
        )}

        <button
          className="lb-icon-btn"
          onClick={onNext}
          disabled={!canNextPage}
          aria-label="Next page"
        >
          ›
        </button>
        <button
          className="lb-icon-btn"
          onClick={() => knownLastPage !== null && onGotoPage(knownLastPage)}
          disabled={knownLastPage === null || !canNextPage}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  )
}
