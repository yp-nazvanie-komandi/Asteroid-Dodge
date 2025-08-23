/*
  ВНИМАНИЕ! Используется только Node.js сервером, НЕ заносить в код клиента

  Данный файл является входной точкой в серверный бандл: 
  - содержит всю основную клиентскую часть приложения, которая будет импортирована и выполнена на стороне сервера
  - при сборке витом конвертируется в mjs
  - используется для рендеринга приложения на стороне сервера (функция render)
*/

import { renderToString } from 'react-dom/server'

import { matchRoutes, StaticRouter } from 'react-router'

import App from './App'

import { createStore } from './redux/main'

import { baseAPI } from './redux/api/base'

import { Routes } from './components/Routes/Routes'
import { routes } from './components/Routes/constants'
interface IRenderArgs {
  url: string
  serverContext: ISSRServerContext
}

export const render = async ({ url, serverContext }: IRenderArgs) => {
  const store = createStore({
    serverContext,
  })

  const matches = matchRoutes(routes, url)

  if (Array.isArray(matches)) {
    await Promise.allSettled(
      matches.map(match => {
        const { route } = match

        return route?.preloader?.({ store })
      }),
    )
  }

  const html = renderToString(
    <App store={store}>
      <StaticRouter location={url}>
        <Routes routes={routes} />
      </StaticRouter>
    </App>
  )

  const preloadedReduxStoreState = store.getState()

  store.dispatch(baseAPI.util.resetApiState())

  return {
    html,
    preloadedReduxStoreState,
  }
}
