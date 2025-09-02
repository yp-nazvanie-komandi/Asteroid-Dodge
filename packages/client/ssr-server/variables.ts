import dotenv from 'dotenv'

dotenv.config()

import {
  DEFAULT_SERVER_PORT,
  DEFAULT_SERVER_HOSTNAME,
  DEFAULT_SERVER_BASE,
  DEFAULT_TEMPLATE_ENCODING,
  DEFAULT_TEMPLATE_SSR_OUTLET_COMMENT,
  DEFAULT_PROD_TEMPLATE_PATH,
  DEFAULT_DEV_TEMPLATE_PATH,
  DEFAULT_DEV_SSR_SERVER_ENTRY_PATH,
  DEFAULT_PROD_SSR_SERVER_ENTRY_PATH,
  DEFAULT_PROD_CLIENT_BUNDLE_PATH,
} from './constants'

export const isProductionEnvironment = process.env.NODE_ENV === 'production'

// ВНИМАНИЕ! есть нюанс в Oauth: "в качестве redirect_uri можно использовать http://localhost:3000/ (без слеша в конце, это важно). Если ваш проект локально использует другой порт и по какой-то причине вам нужен именно он, обратитесь к ментору."
export const serverPort =
  Number(process.env.SSR_SERVER_PORT) || DEFAULT_SERVER_PORT
export const serverHostname =
  process.env.SSR_SERVER_HOSTNAME || DEFAULT_SERVER_HOSTNAME
export const serverBase = process.env.SSR_SERVER_BASE || DEFAULT_SERVER_BASE

export const templateEncoding = (process.env.SSR_SERVER_TEMPLATE_ENCODING ||
  DEFAULT_TEMPLATE_ENCODING) as BufferEncoding
export const templateSsrOutletComment =
  process.env.SSR_SERVER_TEMPLATE_SSR_OUTLET_COMMENT ||
  DEFAULT_TEMPLATE_SSR_OUTLET_COMMENT
export const templatePath =
  process.env.SSR_SERVER_TEMPLATE_PATH ||
  (isProductionEnvironment
    ? DEFAULT_PROD_TEMPLATE_PATH
    : DEFAULT_DEV_TEMPLATE_PATH)

export const ssrServerEntryModulePath =
  process.env.SSR_SERVER_SSR_MODULE_PATH ||
  (isProductionEnvironment
    ? DEFAULT_PROD_SSR_SERVER_ENTRY_PATH
    : DEFAULT_DEV_SSR_SERVER_ENTRY_PATH)

export const clientProdBundlePath =
  process.env.SSR_SERVER_PROD_CLIENT_BUNDLE_PATH ||
  DEFAULT_PROD_CLIENT_BUNDLE_PATH
