// TODO: При необходимости перенести на SSR + переход на Emotion
import type { ReactNode } from 'react'

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

import { CacheProvider } from '@emotion/react'

import { createEmotionCache, createMuiTheme } from './utils'
import ChangeThemeDrop from './change-theme-drop'
import { useState } from 'react'

interface IThemeProps {
  children: ReactNode
}

const emotionCache = createEmotionCache()

const themeLight = createTheme({
  palette: {
    mode: 'light',
  },
})

const themeDark = createTheme({
  palette: {
    mode: 'dark',
  },
})

const themeOrigin = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#e411d9' },
  },
})

export const Theme = ({ children }: IThemeProps) => {
  const cookieMatch = document?.cookie?.match(
    '(^|;)\\s*' + 'theme' + '\\s*=\\s*([^;]+)',
  )
  const themeValue = cookieMatch ? cookieMatch.pop() : undefined

  const [currentTheme, setCurrentTheme] = useState(themeValue || 'light')

  const getTheme = () => {
    switch (currentTheme) {
      case 'dark':
        return themeDark
      case 'pink':
        return themeOrigin
      case 'light':
      default:
        return themeLight
    }
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={getTheme()}>
        <ChangeThemeDrop
          onChange={(event: 'light' | 'dark' | 'pink') => {
            setCurrentTheme(event)
          }}
        />

        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  )
}
