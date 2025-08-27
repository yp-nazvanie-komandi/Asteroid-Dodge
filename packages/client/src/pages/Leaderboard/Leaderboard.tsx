import React from 'react'
import '../shared/LeaderboardRtk/leaderboard.css'
import LeaderboardTable from './LeaderboardTable'

export default function LeaderboardPage() {
  const teamName = 'my-unique-team'
  const ratingFieldName = 'otherField'

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 800,
        background: '#fff',
      }}
    >
      <header
        style={{
          width: 408,
          height: 112,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          marginTop: 24,
          marginBottom: 8,
        }}
      >
        <h1
          style={{
            width: 408,
            height: 112,
            fontFamily: 'VT323, ui-monospace, monospace',
            fontWeight: 400,
            fontSize: 96,
            lineHeight: '116.7%',
            letterSpacing: -1.5,
            color: '#FE6003',
            margin: 0,
          }}
        >
          Leaderboard
        </h1>
      </header>
      <section style={{ width: 984 }}>
        <LeaderboardTable
          teamName={teamName}
          ratingFieldName={ratingFieldName}
          initialPageSize={10}
        />
      </section>
    </main>
  )
}
