import Button from '@mui/material/Button'
import './style.scss'

import { useNavigate } from 'react-router-dom'
import React from 'react'
import { ButtonPropsExtended } from '../../types/button'

export default function AdButton({
  variant = 'contained',
  text = '',
  to,
  href,
  onClick,
}: ButtonPropsExtended) {
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
