import createCache from '@emotion/cache'

export const createEmotionCache = () =>
  // Ахтунг! Должны матчится с SSR сервером
  createCache({ key: 'css' })
