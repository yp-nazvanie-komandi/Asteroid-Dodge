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
          Управляйте кораблём, уворачивайтесь от астероидов и уничтожайте врагов
          в эпических космических боях. Простые правила, затягивающий геймплей и
          рекорды для самых метких!
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
            //TODO поставить правильную навигацию
            window.location.href = 'http://localhost:3001/api-docs' // серверная часть приложения, АПИ форума
          }}
        />
      </div>
    </div>
  )
}
