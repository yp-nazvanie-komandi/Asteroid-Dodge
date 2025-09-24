import { Outlet, useNavigate } from 'react-router'
import { ForumContainer } from '../../components/ForumContainer/ForumContainer'
import Button from '../../components/Button/Button'
import './style.scss'

export const ForumLayout = () => {
  const navigate = useNavigate()

  return (
    <div className="forum-container">
      <h1 className="title">Forum</h1>

      <div className="forum-container__toolbar">
        <Button
          text="Topics list"
          size="medium"
          onClick={() => navigate('/topics')}
        />
        <Button
          text="New topic"
          size="medium"
          onClick={() => navigate('new')}
        />
      </div>
      <Outlet />
    </div>
  )
}
