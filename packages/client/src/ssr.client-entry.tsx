/*
  Данный файл является входной точкой в клиентский бандл: 
  - содержит всю основную клиентскую часть приложения, которая будет загружена на стороне клиента
  - при сборке витом автоматически убирается из шаблона index.html body и вставляется в head
*/
import { hydrateRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router'

import App from './App'

import { Routes } from './components/Routes/Routes'
import { routes } from './components/Routes/constants'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <App>
    <BrowserRouter>
      <Routes routes={routes} />
    </BrowserRouter>
  </App>,
)
