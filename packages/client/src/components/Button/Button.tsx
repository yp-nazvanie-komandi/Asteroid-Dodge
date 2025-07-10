import ButtonMaterial from '@mui/material/Button'
import './style.scss'

import { useNavigate } from 'react-router-dom'
import React from 'react'
import { ButtonPropsExtended } from '../../types/button'

export default function Button({
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
    <ButtonMaterial
      onClick={handleClick}
      className="adButton"
      variant={variant}>
      {text}
    </ButtonMaterial>
  )
}
