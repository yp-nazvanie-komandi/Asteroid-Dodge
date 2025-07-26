import { readdir, writeFile, access, mkdir } from 'node:fs/promises'
import { dirname, resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { generateEndpoints } from '@rtk-query/codegen-openapi'
//
;(async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url))

  const servicesFolder = resolve(__dirname, './services')
  const reduxApiFolder = resolve(__dirname, '../redux/api')

  const services = await readdir(servicesFolder)

  await Promise.all(
    services.map(async serviceFolder => {
      const servicePath = resolve(servicesFolder, serviceFolder)
      const serviceName = basename(serviceFolder)
      const serviceReduxApiFolder = resolve(reduxApiFolder, serviceName)

      const schemaFile = resolve(servicePath, 'schema.json')

      const generatedApi = await generateEndpoints({
        apiFile: '../base.ts',
        apiImport: 'baseAPI',
        exportName: `${serviceName}API`,
        schemaFile,
        hooks: {
          queries: true,
          lazyQueries: true,
          mutations: true,
        },
      })

      try {
        await access(serviceReduxApiFolder)
      } catch {
        await mkdir(serviceReduxApiFolder, { recursive: true })
      }

      const serviceReduxApiFile = resolve(
        serviceReduxApiFolder,
        `${serviceName.toLowerCase()}.ts`
      )

      await writeFile(
        serviceReduxApiFile,
        `/* eslint-disable @typescript-eslint/no-explicit-any */\n/* eslint-disable @typescript-eslint/ban-types */\n// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!\n\n${generatedApi}`,
        'utf-8'
      )
    })
  )
})()
//
