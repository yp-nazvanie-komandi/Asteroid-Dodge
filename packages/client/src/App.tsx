import React, { useEffect } from 'react'
import './App.scss'
import { Router } from './components/Router/Router'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { alpha } from '@mui/material'

function App() {
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

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App
