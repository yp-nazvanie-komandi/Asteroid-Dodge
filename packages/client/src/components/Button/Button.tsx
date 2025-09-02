import ButtonMaterial, { ButtonProps } from '@mui/material/Button'

import './style.scss'
import { styled } from '@mui/material/styles'
import { ReactNode } from 'react'


export interface IButtonPropsExtended extends ButtonProps<'button'> {
  text: string | ReactNode
}

export default function Button({
  variant = 'contained',
  text = '',
  color = 'primary',
  size = 'small',
  onClick,
  ...rest
}: IButtonPropsExtended) {
  return (
    <ButtonMaterial
      customClass = 'MuiButton',
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      {...rest}
    >
      {text}
    </ButtonMaterial>
  )
}
