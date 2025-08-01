import ButtonMaterial from '@mui/material/Button'
import './style.scss'
import { styled } from '@mui/material/styles'

import { ButtonPropsExtended } from '../../types/button'

export default function Button({
  variant = 'contained',
  text = '',
  color = 'primary',
  size = 'small',
  onClick,
  customClass = 'MuiButton',
  ...rest
}: ButtonPropsExtended) {
  return (
    <ButtonMaterial
      className={customClass}
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
