/*
  ВНИМАНИЕ! Используется только Node.js сервером, НЕ заносить в код клиента

  Данный файл является входной точкой в серверный бандл: 
  - содержит всю основную клиентскую часть приложения, которая будет импортирована и выполнена на стороне сервера
  - при сборке витом конвертируется в mjs
  - используется для рендеринга приложения на стороне сервера (функция render)
*/

import { renderToString } from 'react-dom/server'

import { StaticRouter } from 'react-router'

import App from './App'

import { Routes } from './components/Routes/Routes'

interface IRenderArgs {
  /**
   * Прилетает в request express сервера и отдается результату работы хелпера vite.ssrLoadModule
   */
  url: string
}

export const render = ({ url }: IRenderArgs) => {
  return renderToString(
    <App>
      <StaticRouter location={url}>
        <Routes />
      </StaticRouter>
    </App>
  )
}
