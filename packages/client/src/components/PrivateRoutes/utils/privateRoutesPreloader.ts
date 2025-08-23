import type { TRoutePreloader } from '../../Routes/types'

import {
  getAuthUser,
  getRunningQueriesThunk,
} from '../../../redux/api/Auth/enhanced/api'

export const privateRoutesPreloader: TRoutePreloader = async ({ store }) => {
  store.dispatch(getAuthUser.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))
}
