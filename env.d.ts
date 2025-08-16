interface ImportMetaEnv {
  readonly VITE_REDIRECT_URI: string
  readonly VITE_OAUTH_YANDEX_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
