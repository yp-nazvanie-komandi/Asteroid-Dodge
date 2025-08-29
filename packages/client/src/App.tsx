import { type ReactNode, StrictMode } from 'react'

import { Theme } from './components/Theme/Theme'

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import ChangeThemeDrop from './components/Theme/change-theme-drop'

import { Store } from './components/Store/Store'

import './App.scss'
interface IAppProps {
  children: ReactNode
}

function App({ children }: IAppProps) {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Store>
          <Theme>
            <ChangeThemeDrop />

            {children}
          </Theme>
        </Store>
      </ErrorBoundary>
    </StrictMode>
  )
}

export default App
