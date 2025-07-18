import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router'

export const GameOver = () => {
  const navigate = useNavigate()
  const countPoints = 777

  return (
    <div className={'container container--game-over'}>
      <h1 className="title title--white">GAME OVER</h1>

      <p> Ваш счет: {countPoints}</p>

      <Button
        color={'info'}
        size={'large'}
        onClick={() => {
          navigate('/start')
        }}
        text={'Play again'}
      />

      <Button
        color={'info'}
        size={'large'}
        onClick={() => {
          navigate('/')
        }}
        text={'Main menu'}
      />
    </div>
  )
}
