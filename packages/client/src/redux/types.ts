import type { createStore } from './main'

export type TAppStore = ReturnType<typeof createStore>
export type TRootState = ReturnType<TAppStore['getState']>
export type TAppDispatch = TAppStore['dispatch']
