import * as React from 'react'
import { useLocation, useNavigate } from 'react-router'

import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import SportsEsports from '@mui/icons-material/SportsEsports'
import Home from '@mui/icons-material/Home'
import Settings from '@mui/icons-material/Settings'
import EmojiEvents from '@mui/icons-material/EmojiEvents'
import Groups from '@mui/icons-material/Groups'

import './style.scss'

interface MenuItem {
  label: string
  value: string
  icon: React.ReactNode
  link: string
}

const hiddenPaths = ['/login', '/registration', '/OAuth', '/game'] // пути, на которых меню скрыто

const menuItems: MenuItem[] = [
  { label: 'Main', value: '/', icon: <Home />, link: '/' },
  { label: 'Start', value: '/start', icon: <SportsEsports />, link: '/start' },
  { label: 'Profile', value: '/profile', icon: <Settings />, link: '/profile' },
  { label: 'Forum', value: '/forum', icon: <Groups />, link: '/forum' },
  {
    label: 'Leaderbord',
    value: '/leaderboard',
    icon: <EmojiEvents />,
    link: '/leaderboard',
  },
]

export const FloatMenu = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Состояние value синхронизируем с текущим URL
  const [value, setValue] = React.useState(location.pathname)

  // При изменении location.pathname обновляем value
  React.useEffect(() => {
    setValue(location.pathname)
  }, [location.pathname])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    navigate(newValue)
  }

  // Если текущий путь в списке скрытых — не показываем меню
  if (hiddenPaths.includes(location.pathname)) {
    return null
  }

  return (
    <BottomNavigation sx={{ width: 50 }} value={value} onChange={handleChange}>
      {menuItems.map(({ label, value, icon }) => (
        <BottomNavigationAction
          key={value}
          label={label}
          value={value}
          icon={icon}
        />
      ))}
    </BottomNavigation>
  )
}
