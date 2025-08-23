/*
  Данный файл используется для классического CSR рендера приложения по умолчанию
*/

import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router'

import App from './App'

import { Routes } from './components/Routes/Routes'
import { routes } from './components/Routes/constants'

createRoot(document.getElementById('root') as HTMLElement).render(
  <App>
    <BrowserRouter>
      <Routes routes={routes} />
    </BrowserRouter>
  </App>
)
