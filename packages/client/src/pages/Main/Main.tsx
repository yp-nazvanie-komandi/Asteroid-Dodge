import avatarImg from '/src/assets/img/tmp-avatar.png'
import rocketSvg from '/src/assets/img/rocket.svg'

import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export const Main = () => {
  const profile = {
    name: 'test name',
    img: avatarImg,
  }

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
      </div>

      <div className="links">
        <Link className="links-block" component={RouterLink} to="/profile">
          <img src={profile.img} alt="avatar" />

          <span>{profile.name}</span>
        </Link>

        <Link className="links-block" component={RouterLink} to="/achievements">
          <span>Achievements</span>
        </Link>
      </div>
    </div>
  )
}
