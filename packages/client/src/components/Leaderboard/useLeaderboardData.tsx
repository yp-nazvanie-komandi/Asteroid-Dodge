export default function useLeaderboardData(total = 100) {
  const data = Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    player: `Player ${i + 1}`,
    wins: Math.floor(Math.random() * 50),
    score: Math.floor(Math.random() * 100000),
  }))
  return { data }
}
