import type { ReactNode } from 'react'

import { ThemeProvider, createTheme, alpha } from '@mui/material'

const violetBase = '#862DF9'
const violetMain = alpha(violetBase, 0.7)

const orangeBase = '#FE6003'
const orangeMain = alpha(orangeBase, 0.7)

const theme = createTheme({
  palette: {
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
    },
    info: {
      main: orangeMain,
      light: alpha(orangeBase, 0.5),
      dark: alpha(orangeBase, 0.9),
    },
  },
})

interface IThemeProps {
  children: ReactNode
}

export const Theme = ({ children }: IThemeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
