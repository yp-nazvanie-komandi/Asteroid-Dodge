import { defineConfig, type Plugin } from 'vite'

import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'

dotenv.config()

interface IPluginOptions {
  mode?: string
}

const DEFAULT_TEMPLATE_SSR_OUTLET_COMMENT = '<!--SSR-CONTENT-->'
const DEFAULT_TEMPLATE_OUTLET = 'TEMPLATE_OUTLET'

const DEFAULT_TEMPLATE_CLIENT_ENTRY_PATH = '/src/main.tsx'
const DEFAULT_TEMPLATE_SSR_CLIENT_ENTRY_PATH = '/src/ssr.client-entry.tsx'

const DEFAULT_CLIENT_SSR_MODE_NAME = 'ssr'

// Данный плагин используется для трансформации основного HTML-шаблона между CSR и SSR видами
const htmlTransformPlugin = ({ mode }: IPluginOptions): Plugin => {
  return {
    name: 'html-ssr-transform',
    transformIndexHtml(html) {
      let transformedHtml = html

      const templateOutlet =
        process.env.SSR_SERVER_TEMPLATE_OUTLET || DEFAULT_TEMPLATE_OUTLET

      const templateSsrOutlet =
        process.env.SSR_SERVER_TEMPLATE_SSR_OUTLET_COMMENT ||
        DEFAULT_TEMPLATE_SSR_OUTLET_COMMENT

      const templateClientEntryPath =
        process.env.SSR_SERVER_TEMPLATE_CLIENT_ENTRY_PATH ||
        DEFAULT_TEMPLATE_CLIENT_ENTRY_PATH

      const templateSsrClientEntryPath =
        process.env.SSR_SERVER_TEMPLATE_SSR_CLIENT_ENTRY_PATH ||
        DEFAULT_TEMPLATE_SSR_CLIENT_ENTRY_PATH

      transformedHtml = transformedHtml.replace(
        templateOutlet,
        mode === DEFAULT_CLIENT_SSR_MODE_NAME ? templateSsrOutlet : '',
      )

      if (mode === DEFAULT_CLIENT_SSR_MODE_NAME) {
        transformedHtml = transformedHtml.replace(
          templateClientEntryPath,
          templateSsrClientEntryPath,
        )
      }

      return transformedHtml
    },
  }
}

export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __YP_API_BASE_URL__: '"https://ya-praktikum.tech/api/v2"',
    __ASTEROID_DODGE_API_BASE_URL__: '"http://localhost:3001/"',
    __SSR_YP_API_BASE_URL__: `"http://${process.env.SSR_SERVER_HOSTNAME}:${process.env.SSR_SERVER_PORT}/api/v2"`,
    __SSR_ASTEROID_DODGE_API_BASE_URL__: `"http://${process.env.SSR_SERVER_HOSTNAME}:${process.env.SSR_SERVER_PORT}/"`,
    __API_MODE__: process.env.CLIENT_MODE === 'ssr' ? '"ssr"' : '"csr"',
  },
  plugins: [react(), htmlTransformPlugin({ mode: process.env.CLIENT_MODE })],
})
