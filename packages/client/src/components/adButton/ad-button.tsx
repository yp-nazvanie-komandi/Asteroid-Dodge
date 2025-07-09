import Button from '@mui/material/Button'
import './style.scss'

import { useNavigate } from 'react-router-dom'

interface AdButtonProps {
  variant?: 'text' | 'outlined' | 'contained'
  text?: string
  to?: string // внутренняя навигация
  href?: string // внешняя ссылка
  onClick?: () => void // обработчик клика
}

export default function AdButton({
  variant = 'contained',
  text = '',
  to,
  href,
  onClick,
}: AdButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (to) {
      navigate(to)
    } else if (href) {
      window.location.href = href
    }
    // иначе ничего не делаем
  }

  return (
    <Button onClick={handleClick} className="adButton" variant={variant}>
      {text}
    </Button>
  )
}
