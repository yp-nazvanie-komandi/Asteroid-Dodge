import { type ReactNode, StrictMode, useMemo } from 'react'

import type { EmotionCache } from '@emotion/react'

import { Provider } from 'react-redux'

import { Theme } from './components/Theme/Theme'

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

import type { TAppStore } from './redux/types'

import { createStore } from './redux/main'

import './App.scss'

interface IAppProps {
  children: ReactNode
  store?: TAppStore
  initialTheme?: string
  emotionCache?: EmotionCache
}

function App({ children, store, initialTheme, emotionCache }: IAppProps) {
  const reduxStore = useMemo(() => {
    if (store) {
      return store
    }

    return createStore({
      initialState: window.__PRELOADED_STATE__,
    })
  }, [store])

  return (
    <StrictMode>
      <ErrorBoundary>
        <Provider store={reduxStore}>
          <Theme initialTheme={initialTheme} emotionCache={emotionCache}>
            {children}
          </Theme>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  )
}

export default App
