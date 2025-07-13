import { ButtonProps } from '@mui/material/Button/Button'
import { MouseEventHandler } from 'react'

export type ButtonPropsExtended = ButtonProps & {
  variant?: 'text' | 'outlined' | 'contained'
  text?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
