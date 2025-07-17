import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.scss'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
