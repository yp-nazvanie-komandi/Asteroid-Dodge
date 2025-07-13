import ButtonMaterial from '@mui/material/Button'
import './style.scss'

import React from 'react'
import { ButtonPropsExtended } from '../../types/button'

export default function Button({
  variant = 'contained',
  text = '',
}: ButtonPropsExtended) {
  return (
    <ButtonMaterial className="adButton" variant={variant}>
      {text}
    </ButtonMaterial>
  )
}
