import { useMemo } from 'react'

import { Routes as ReactRouterRoutes } from 'react-router'

import type { TRouteDescriptor } from './types'

import { renderRouterTree } from './utils/renderRouterTree'
interface IRoutesProps {
  routes: TRouteDescriptor[]
}

export const Routes = ({ routes }: IRoutesProps) => {
  const routerTree = useMemo(() => {
    return routes.map((route, index) =>
      renderRouterTree({ ...route, _positionIndex: index }),
    )
  }, [routes])

  return <ReactRouterRoutes>{routerTree}</ReactRouterRoutes>
}
