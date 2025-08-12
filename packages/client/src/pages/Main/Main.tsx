import rocketSvg from '/src/assets/img/rocket.svg'

import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router'
import { useHashParams } from '../../hooks/Auth/useOAuth'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export const Main = () => {
  const navigate = useNavigate()

  const { access_token, token_type } = useHashParams()

  useEffect(() => {
    if (access_token) {
      // Делаем что-то с токеном
      console.log('access_token:', access_token)

      // Записываем токен в cookies
      Cookies.set('auth_token', access_token, {
        expires: 1, // 1 день
        secure: true,
        sameSite: 'strict',
      })
    }
  }, [access_token])

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
      </div>
    </div>
  )
}
