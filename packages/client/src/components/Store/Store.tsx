import type { ReactNode } from 'react'

import { Provider } from 'react-redux'

import { store } from '../../redux/main'

interface IStoreProps {
  children: ReactNode
}

export const Store = ({ children }: IStoreProps) => {
  return <Provider store={store}>{children}</Provider>
}
