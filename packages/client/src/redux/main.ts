import {
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

import { useDispatch, useSelector, useStore } from 'react-redux'

import type { TAppDispatch, TAppStore, TRootState } from './types'

import { baseAPI as api } from './api/base'
import { userAPI } from './api/base'

interface ICreateStoreArgs {
  serverContext?: ISSRServerContext
  initialState?: IPreloadedReduxStoreState
}

export const createStore = (args?: ICreateStoreArgs) => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    preloadedState: args?.initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: args?.serverContext,
        },
      }).concat(api.middleware),
  })

  setupListeners(store.dispatch)

  return store
}

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>()
export const useAppSelector = useSelector.withTypes<TRootState>()
export const useAppStore = useStore.withTypes<TAppStore>()

export const _serverContextThunk =
  (
    updatedContext: Partial<ISSRServerContext>,
  ): ThunkAction<
    void,
    TRootState,
    ISSRServerContext | undefined,
    UnknownAction
  > =>
  (_dispatch, _getState, extra) => {
    if (extra?.response) {
      extra.response.redirect = updatedContext?.response?.redirect
    }
  }
