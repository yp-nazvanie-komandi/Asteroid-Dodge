import rocketSvg from '/src/assets/img/rocket.svg'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router'

export const Main = () => {
  const navigate = useNavigate()

  return (
    <div className={'container container--about'}>
      <div className="main-block">
        <h1 className="title">Asteroid Dodge</h1>

        <p>
          Control the ship, dodge asteroids and destroy enemies In epic cosmic
          battles. Simple rules that delay the gameplay and Records for the most
          well!
        </p>

        <img src={rocketSvg} alt="rocket" />

        <Button
          text={'Play'}
          color={'info'}
          size={'large'}
          onClick={() => {
            navigate('/start')
          }}
        />

        <Button
          text={'Settings'}
          size={'medium'}
          onClick={() => {
            navigate('/profile')
          }}
        />

        <Button
          text={'Rating'}
          size={'medium'}
          onClick={() => {
            navigate('/leaderboard')
          }}
        />

        <Button
          text={'Forum'}
          size={'medium'}
          onClick={() => {
            navigate('/topics')
          }}
        />
      </div>
    </div>
  )
}
