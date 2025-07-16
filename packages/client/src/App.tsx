import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { alpha } from '@mui/material'
import { Router } from './components/Router/Router'

const violetBase = '#862DF9'
const violetMain = alpha(violetBase, 0.7)

const theme = createTheme({
  palette: {
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
    },
  },
})

function MainRouter() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default MainRouter
