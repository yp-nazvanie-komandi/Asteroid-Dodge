// TODO: При необходимости перенести на SSR + переход на Emotion
import { createTheme, alpha } from '@mui/material'

import createCache from '@emotion/cache'

const DEFAULT_EMOTION_CACHE_KEY = 'css'

const violetBase = '#862DF9'
const violetMain = alpha(violetBase, 0.7)

const orangeBase = '#FE6003'
const orangeMain = alpha(orangeBase, 0.7)

export const createMuiTheme = () =>
  createTheme({
    palette: {
      primary: {
        main: violetMain,
        light: alpha(violetBase, 0.5),
        dark: alpha(violetBase, 0.9),
      },
      info: {
        main: orangeMain,
        light: alpha(orangeBase, 0.5),
        dark: alpha(orangeBase, 0.9),
      },
    },
  })

export const createEmotionCache = () =>
  createCache({ key: DEFAULT_EMOTION_CACHE_KEY })
