import { useMemo, type ReactNode } from 'react'

import { Provider } from 'react-redux'

import type { TAppStore } from '../../redux/types'

import { createStore } from '../../redux/main'

interface IStoreProps {
  children: ReactNode
  store?: TAppStore
}

export const Store = ({ children, store }: IStoreProps) => {
  const reduxStore = useMemo(() => {
    if (store) {
      return store
    }

    return createStore({
      initialState: window.__PRELOADED_STATE__,
    })
  }, [store])

  return <Provider store={reduxStore}>{children}</Provider>
}
