/*
  ВНИМАНИЕ! Используется только Node.js сервером, НЕ заносить в код клиента

  Данный файл является входной точкой в серверный бандл: 
  - содержит всю основную клиентскую часть приложения, которая будет импортирована и выполнена на стороне сервера
  - при сборке витом конвертируется в mjs
  - используется для рендеринга приложения на стороне сервера (функция render)
*/

import { renderToString } from 'react-dom/server'

import { matchRoutes, StaticRouter } from 'react-router'

import createEmotionServer from '@emotion/server/create-instance'

import App from './App'

import { createStore } from './redux/main'

import { baseAPI, asteroidDodgeAPI } from './redux/api/base'

import {
  getAuthUser,
  getRunningQueriesThunk as getRunningAuthQueriesThunk,
} from './redux/api/Auth/enhanced/api'
import {
  getApiV1Themes,
  getApiV1UsersTheme,
  getRunningQueriesThunk as getRunningAsteroidDodgeQueriesThunk,
} from './redux/api/AsteroidDodge/enhanced/api'

import { Routes } from './components/Routes/Routes'
import { routes } from './components/Routes/constants'

import { createEmotionCache } from './components/Theme/utils'

interface IRenderArgs {
  url: string
  serverContext: ISSRServerContext
}

export const render = async ({ url, serverContext }: IRenderArgs) => {
  const store = createStore({
    serverContext,
  })

  // USER_PRELOADER используем глобально, так как нужен по факту для тем
  store.dispatch(getAuthUser.initiate())

  await Promise.all(store.dispatch(getRunningAuthQueriesThunk()))
  //

  // THEME_PRELOADER используем глобально, так как нужен по факту для тем
  store.dispatch(getApiV1Themes.initiate({}))
  store.dispatch(getApiV1UsersTheme.initiate())

  await Promise.all(store.dispatch(getRunningAsteroidDodgeQueriesThunk()))
  //

  // Внимание! Вот тут уже serverContext будет прошит темой, которая должна будет заоверайдить request, берем значение оттуда

  const themeCookie = serverContext.request.cookies
    ?.find(cookie => cookie.startsWith('theme='))
    ?.split('=')[1]

  const matches = matchRoutes(routes, url)

  if (Array.isArray(matches)) {
    await Promise.allSettled(
      matches.map(match => {
        const { route } = match

        return route?.preloader?.({ store })
      }),
    )
  }

  const emotionCache = createEmotionCache()

  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(emotionCache)

  // data extraction
  const html = renderToString(
    <App initialTheme={themeCookie} emotionCache={emotionCache} store={store}>
      <StaticRouter location={url}>
        <Routes routes={routes} />
      </StaticRouter>
    </App>,
  )

  const preloadedReduxStoreState = store.getState()

  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)

  // cleanup
  store.dispatch(baseAPI.util.resetApiState())
  store.dispatch(asteroidDodgeAPI.util.resetApiState())

  return {
    html,
    emotionCss,
    preloadedReduxStoreState,
  }
}
