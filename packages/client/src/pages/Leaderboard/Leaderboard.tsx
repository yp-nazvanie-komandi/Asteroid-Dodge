import React from 'react'
import './leaderboard.scss'
import LeaderboardTable from '../../components/Leaderboard/LeaderboardTable'
import { ASTEROID_DODGE_SCORE } from '../../utils/constants'

export default function LeaderboardPage() {
  return (
    <div className="lb-container">
      <main className="lb-page">
        <header className="lb-header">
          <h1 className="lb-title">Leaderboard</h1>
        </header>
        <section className="lb-section">
          <LeaderboardTable
            ratingFieldName={ASTEROID_DODGE_SCORE}
            initialPageSize={10}
          />
        </section>
      </main>
    </div>
  )
}
