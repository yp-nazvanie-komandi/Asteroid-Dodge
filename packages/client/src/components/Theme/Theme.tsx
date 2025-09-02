// TODO: При необходимости перенести на SSR + переход на Emotion
import type { ReactNode } from 'react'

import { ThemeProvider, CssBaseline } from '@mui/material'

import { CacheProvider } from '@emotion/react'

import { createEmotionCache, createMuiTheme } from './utils'

interface IThemeProps {
  children: ReactNode
}

const muiTheme = createMuiTheme()
const emotionCache = createEmotionCache()

export const Theme = ({ children }: IThemeProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  )
}
