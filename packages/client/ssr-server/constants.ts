export const DEFAULT_SERVER_BASE = '/'

export const DEFAULT_TEMPLATE_ENCODING = 'utf-8'

export const DEFAULT_TEMPLATE_SSR_OUTLET_COMMENT = '<!--SSR-CONTENT-->'

export const DEFAULT_DEV_TEMPLATE_PATH = '/index.html'
export const DEFAULT_PROD_TEMPLATE_PATH = '/app-ssr-client-bundle/index.html'

export const DEFAULT_DEV_SSR_SERVER_ENTRY_PATH = '/src/ssr.server-entry.tsx'
export const DEFAULT_PROD_SSR_SERVER_ENTRY_PATH =
  '/app-ssr-server-bundle/ssr.server-entry.mjs'

export const DEFAULT_PROD_CLIENT_BUNDLE_PATH = '/app-ssr-client-bundle'

export const HOSTNAME_MISSING_ERROR =
  'Переменная "SSR_SERVER_HOSTNAME" не определена или является пустой строкой'
export const PORT_MISSING_ERROR =
  'Переменная "SSR_SERVER_PORT" не определена или не является валидным числом'
