import ButtonMaterial from '@mui/material/Button'
import './style.scss'
import { ButtonPropsExtended } from './types'

export default function Button({
  variant = 'contained',
  text = '',
  color = 'primary',
  size = 'small',
  onClick,
  ...rest
}: ButtonPropsExtended) {
  return (
    <ButtonMaterial
      className="MuiButton"
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
