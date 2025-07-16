import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Error400 from './pages/400/400'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { alpha } from '@mui/material'

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
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/400" element={<Error400 />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default MainRouter
