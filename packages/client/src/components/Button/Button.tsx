import ButtonMaterial from '@mui/material/Button'
import './style.scss'

import React from 'react'
import { ButtonPropsExtended } from '../../types/button'

export default function Button({
  variant = 'contained',
  text = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}: ButtonPropsExtended) {
  return (
    <ButtonMaterial className="adButton" variant={variant} onClick={onClick}>
      {text}
    </ButtonMaterial>
  )
}
