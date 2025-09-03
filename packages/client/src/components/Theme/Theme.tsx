// TODO: При необходимости перенести на SSR + переход на Emotion
import { useRef, useState, type ReactNode } from 'react'

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

import { CacheProvider, type EmotionCache } from '@emotion/react'

import ChangeThemeDrop from './change-theme-drop'

import { useLazyGetApiV1UsersThemeQuery } from '../../redux/api/AsteroidDodge/enhanced/api'

import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { useAuth } from '../../hooks/Auth/useAuth'

import { createEmotionCache } from './utils'

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

const cookieMatch =
  typeof document !== 'undefined'
    ? document?.cookie?.match('(^|;)\\s*' + 'theme' + '\\s*=\\s*([^;]+)')
    : null

interface IThemeProps {
  initialTheme?: string
  emotionCache?: EmotionCache
  children: ReactNode
}

const getThemeObjectByName = (themeName: string) => {
  switch (themeName) {
    case 'dark':
      return themeDark
    case 'pink':
      return themeOrigin
    case 'light':
    default:
      return themeLight
  }
}

export const Theme = ({
  children,
  initialTheme: initialThemeProp,
  emotionCache: emotionCacheProp,
}: IThemeProps) => {
  // Ахтунг! они по идее должны матчится) иначе будет рофлан с гидрацией
  const initialThemeFromCookie = cookieMatch
    ? cookieMatch[cookieMatch.length - 1]
    : undefined

  const initialTheme = initialThemeProp || initialThemeFromCookie

  const [currentTheme, setCurrentTheme] = useState(initialTheme ?? 'light')

  const { isAuthenticated } = useAuth()

  const [getUserTheme] = useLazyGetApiV1UsersThemeQuery()

  // Даже в стрикт моде очень желательно вызвать запрос ровно 1 раз
  const queryCallerRef = useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (!queryCallerRef.current) {
      if (!initialTheme && isAuthenticated) {
        queryCallerRef.current = true

        getUserTheme()
          .unwrap()
          .then(data => {
            setCurrentTheme(data.name)
          })
          .catch()
      }
    }
  }, [initialTheme, isAuthenticated])

  return (
    <CacheProvider value={emotionCacheProp || emotionCache}>
      <ThemeProvider theme={getThemeObjectByName(currentTheme)}>
        <ChangeThemeDrop
          currentTheme={currentTheme}
          onChange={setCurrentTheme}
        />
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  )
}
