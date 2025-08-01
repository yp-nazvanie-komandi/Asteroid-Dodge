import ButtonMaterial, { ButtonProps } from '@mui/material/Button'
import './style.scss'
import { styled } from '@mui/material/styles'

interface IButtonPropsExtended extends ButtonProps<'button'> {
  text: string
}

export default function Button({
  variant = 'contained',
  text = '',
  color = 'primary',
  size = 'small',
  onClick,
  customClass = 'MuiButton',
  ...rest
}: IButtonPropsExtended) {
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
