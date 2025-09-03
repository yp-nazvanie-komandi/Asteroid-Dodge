import type { ViteDevServer } from 'vite'

import { readFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

import express from 'express'

import cookieParser from 'cookie-parser'

import { createProxyMiddleware } from 'http-proxy-middleware'

import serialize from 'serialize-javascript'

import { HOSTNAME_MISSING_ERROR, PORT_MISSING_ERROR } from './constants'

import {
  isProductionEnvironment,
  templateEncoding,
  templateSsrOutletComment,
  serverPort,
  serverHostname,
  serverBase,
  templatePath,
  ssrServerEntryModulePath,
  clientProdBundlePath,
} from './variables'

//
;(async () => {
  const actualServerHostname = serverHostname?.trim()

  if (!actualServerHostname) {
    throw new Error(HOSTNAME_MISSING_ERROR)
  }

  const actualServerPort = Number(serverPort)

  if (isNaN(actualServerPort) || actualServerPort <= 0) {
    throw new Error(PORT_MISSING_ERROR)
  }

  const projectRoot = resolve(__dirname, '../')

  const app = express()

  app.use(cookieParser())

  let viteDevServer: ViteDevServer

  if (isProductionEnvironment) {
    // https://nodejs.org/api/esm.html#import-expressions
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(
      serverBase,
      sirv(join(projectRoot, clientProdBundlePath), { extensions: [] }),
    )
  } else {
    // Только в dev режиме загружаем vite модуль и необходимые к нему утилиты и подключаем его как middleware для express
    const { createServer: createViteDevServer } = await import('vite')

    viteDevServer = await createViteDevServer({
      server: { middlewareMode: true },
      root: projectRoot,
      appType: 'custom',
    })

    app.use(viteDevServer.middlewares)
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      logger: console,
      // TODO: переместить в env
      target: 'https://ya-praktikum.tech/api/v2',
    }),
  )

  app.use(
    '/api/v1',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      logger: console,
      // TODO: переместить в env
      target: 'http://localhost:3001/api/v1',
    }),
  )

  app.use('*all', async (request, response) => {
    try {
      let htmlTemplate: string

      // Отправляем в ssr рендер функцию маленький кусочек информации с сервера, при необходимости можно расширить и дополнить большим количеством данных
      // например передавать как в нексте полный request (http.IncomingMessage) и response (http.OutgoingMessage)
      let ssrRenderFunction: (args: {
        url: string
        serverContext: ISSRServerContext
      }) =>
        | Promise<{
            html: string
            emotionCss: string
            preloadedReduxStoreState: IPreloadedReduxStoreState
          }>
        | {
            html: string
            emotionCss: string
            preloadedReduxStoreState: IPreloadedReduxStoreState
          }

      const url = request.originalUrl

      if (isProductionEnvironment) {
        htmlTemplate = await readFile(
          join(projectRoot, templatePath),
          templateEncoding,
        )

        let resolvedSsrEntryPath = join(projectRoot, ssrServerEntryModulePath)

        // Ловим ошибку в прод сборке при использовании esm import() ERR_UNSUPPORTED_ESM_URL_SCHEME On Windows, absolute paths must be valid file:// URLs
        if (process.platform === 'win32') {
          resolvedSsrEntryPath = pathToFileURL(resolvedSsrEntryPath).toString()
        }

        ssrRenderFunction = (await import(resolvedSsrEntryPath)).render
      } else {
        htmlTemplate = await readFile(
          join(projectRoot, templatePath),
          templateEncoding,
        )

        htmlTemplate = await viteDevServer.transformIndexHtml(url, htmlTemplate)

        ssrRenderFunction = (
          await viteDevServer.ssrLoadModule(
            join(projectRoot, ssrServerEntryModulePath),
          )
        ).render
      }

      // ВНИМАНИЕ! Серверный контекст на данный момент недоступен для использования в компонентах и работает только через redux thunk extraArgument замыкание
      // см https://github.com/reduxjs/redux-thunk/blob/master/src/index.ts#L18 + https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/getDefaultMiddleware.ts#L68
      const serverContext: ISSRServerContext = {
        request: Object.freeze({
          cookies: Object.entries(request.cookies).map(
            ([name, value]) => `${name}=${value}`,
          ),
        }),
        response: {},
      }

      const {
        html: renderedApplication,
        emotionCss,
        preloadedReduxStoreState,
      } = await ssrRenderFunction({
        url,
        serverContext,
      })

      if (serverContext.response.redirect) {
        response.redirect(serverContext.response.redirect)
        return
      }

      const html = htmlTemplate
        .replace(templateSsrOutletComment, renderedApplication)
        .replace(
          // TODO: переместить в env
          '/*__PRELOADED_STATE__*/',
          `window.__PRELOADED_STATE__ = ${serialize(preloadedReduxStoreState)};`,
        )
        .replace(
          // TODO: переместить в env
          '<!-- EMOTION_CSS -->',
          emotionCss,
        )

      response.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (error) {
      viteDevServer?.ssrFixStacktrace(error as Error)

      console.error(error)

      response.status(500).end((error as Error).stack)
    }
  })

  app.listen(actualServerPort, actualServerHostname, () => {
    console.log(
      `[SSR-SERVER] SSR сервер доступен по адресу: http://${actualServerHostname}:${actualServerPort}`,
    )
  })
})()
//
