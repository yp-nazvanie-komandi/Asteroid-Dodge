import { type ReactNode, StrictMode, useMemo } from 'react'

import { Provider } from 'react-redux'

import { Theme } from './components/Theme/Theme'

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

import type { TAppStore } from './redux/types'

import { createStore } from './redux/main'

import './App.scss'

interface IAppProps {
  children: ReactNode
  store?: TAppStore
}

function App({ children, store }: IAppProps) {
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
          <Theme>{children}</Theme>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  )
}

export default App
