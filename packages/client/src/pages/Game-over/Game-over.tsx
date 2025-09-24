import React from 'react'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router'
import { useSubmitGameResultRtk } from '../../components/GameOver/usePostGameResult'

interface GameOverProps {
  countPoints: number
}

export const GameOver: React.FC<GameOverProps> = ({ countPoints }) => {
  const navigate = useNavigate()
  const { isSubmitting, error } = useSubmitGameResultRtk(countPoints, {
    auto: true,
  })

  if (isSubmitting) {
    return <div className="container">Saving result…</div>
  }

  if (error) {
    return (
      <div className="container">
        <h1>GAME OVER</h1>
        <p>Error saving the result</p>
        <p>Count: {countPoints}</p>
      </div>
    )
  }

  return (
    <div className="container container--game-over">
      <h1 className="title title--white">GAME OVER</h1>
      <p> Your account: {countPoints}</p>
      <Button
        color="info"
        size="large"
        onClick={() => navigate('/start')}
        text="Play again"
      />
      <Button
        color="info"
        size="large"
        onClick={() => navigate('/')}
        text="Main menu"
      />
    </div>
  )
}
