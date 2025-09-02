import ts from 'typescript'

import { readdir, writeFile, access, mkdir } from 'node:fs/promises'
import { resolve, basename } from 'node:path'

import { generateEndpoints } from '@rtk-query/codegen-openapi'
//
;(async () => {
  const servicesFolder = resolve(__dirname, './services')
  const reduxApiFolder = resolve(__dirname, '../src/redux/api')

  const services = await readdir(servicesFolder)

  await Promise.all(
    services.map(async serviceFolder => {
      const servicePath = resolve(servicesFolder, serviceFolder)
      const serviceName = basename(serviceFolder)
      const serviceReduxApiFolder = resolve(
        reduxApiFolder,
        serviceName,
        'generated',
      )

      const schemaFile = resolve(servicePath, 'schema.json')

      const generatedApi = await generateEndpoints({
        apiFile: '../../base.ts',
        apiImport: 'baseAPI',
        exportName: `${serviceName}API`,
        schemaFile,
        hooks: {
          queries: true,
          lazyQueries: true,
          mutations: true,
        },
      })

      const sourceFile = ts.createSourceFile(
        'VIRTUAL_FILE.ts',
        generatedApi as string,
        ts.ScriptTarget.Latest,
        false,
        ts.ScriptKind.TS,
      )

      const typeNodes: (
        | ts.TypeAliasDeclaration
        | ts.InterfaceDeclaration
        | ts.EnumDeclaration
      )[] = []
      const typesNames: Set<string> = new Set()
      const codeNodes: ts.Node[] = []

      sourceFile.forEachChild(node => {
        if (
          ts.isTypeAliasDeclaration(node) ||
          ts.isInterfaceDeclaration(node) ||
          ts.isEnumDeclaration(node)
        ) {
          typeNodes.push(node)
          typesNames.add(node.name.text)
        } else {
          codeNodes.push(node)
        }
      })

      const printer = ts.createPrinter()

      const typesCode = typeNodes
        .map(node =>
          printer.printNode(ts.EmitHint.Unspecified, node, sourceFile),
        )
        .join('\n')
      let apiCode = codeNodes
        .map(node =>
          printer.printNode(ts.EmitHint.Unspecified, node, sourceFile),
        )
        .join('\n')

      const typesImportStatement = `import type { ${Array.from(typesNames).join(', ')} } from './types'`

      apiCode = typesImportStatement + '\n' + apiCode

      try {
        await access(serviceReduxApiFolder)
      } catch {
        await mkdir(serviceReduxApiFolder, { recursive: true })
      }

      const apiFile = resolve(serviceReduxApiFolder, `api.ts`)
      const typesFile = resolve(serviceReduxApiFolder, `types.ts`)

      const prefixContent = (content: string) =>
        `/* eslint-disable @typescript-eslint/no-unused-vars */\n/* eslint-disable @typescript-eslint/no-explicit-any */\n/* eslint-disable @typescript-eslint/ban-types */\n// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!\n${content}`

      await Promise.all([
        writeFile(apiFile, prefixContent(apiCode), 'utf-8'),
        writeFile(typesFile, prefixContent(typesCode), 'utf-8'),
      ])
    }),
  )
})()
//
