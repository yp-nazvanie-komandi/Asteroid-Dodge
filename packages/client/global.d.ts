import type { CombinedState } from '@reduxjs/toolkit/query'

declare global {
  interface ISSRServerContext {
    readonly request: Readonly<{
      cookies?: string[]
    }>
    response: {
      cookies?: string[]
      redirect?: string
    }
  }

  interface IPreloadedReduxStoreState {
    // eslint-disable-next-line @typescript-eslint/ban-types
    API: CombinedState<{}, never, 'API'>
  }

  interface Window {
    __PRELOADED_STATE__?: IPreloadedReduxStoreState
  }
}

export {}
