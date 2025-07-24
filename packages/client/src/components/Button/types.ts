import { MouseEventHandler } from 'react'
import { ButtonProps } from '@mui/material'

export type ButtonPropsExtended = ButtonProps & {
  variant?: 'text' | 'outlined' | 'contained'
  text?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
