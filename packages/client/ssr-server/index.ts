import type { ViteDevServer } from 'vite'

import { readFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

import express from 'express'

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
  const projectRoot = resolve(__dirname, '../')

  const app = express()

  let viteDevServer: ViteDevServer

  if (isProductionEnvironment) {
    // https://nodejs.org/api/esm.html#import-expressions
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    // @ts-expect-error https://github.com/expressjs/compression/issues/223
    app.use(compression())
    app.use(
      serverBase,
      sirv(join(projectRoot, clientProdBundlePath), { extensions: [] })
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

  app.use('*all', async (request, response) => {
    try {
      let htmlTemplate: string

      let ssrRenderFunction: (args: { url: string }) => string | Promise<string>

      const url = request.originalUrl

      if (isProductionEnvironment) {
        htmlTemplate = await readFile(
          join(projectRoot, templatePath),
          templateEncoding
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
          templateEncoding
        )

        htmlTemplate = await viteDevServer.transformIndexHtml(url, htmlTemplate)

        ssrRenderFunction = (
          await viteDevServer.ssrLoadModule(
            join(projectRoot, ssrServerEntryModulePath)
          )
        ).render
      }

      const renderedApplication = await ssrRenderFunction({
        url,
      })

      const html = htmlTemplate.replace(
        templateSsrOutletComment,
        renderedApplication
      )

      response.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (error) {
      viteDevServer?.ssrFixStacktrace(error as Error)

      console.error(error)

      response.status(500).end((error as Error).stack)
    }
  })

  app.listen(serverPort, serverHostname, () => {
    console.log(
      `[SSR-SERVER] SSR сервер доступен по адресу: http://${serverHostname}:${serverPort}`
    )
  })
})()
//
