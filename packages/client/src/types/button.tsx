import { ButtonProps } from '@mui/material/Button/Button'

export type ButtonPropsExtended = ButtonProps & {
  variant?: 'text' | 'outlined' | 'contained'
  text?: string
  to?: string // внутренняя навигация
  href?: string // внешняя ссылка
  onClick?: () => void // обработчик клика
}
