import { Route as ReactRouterRoute } from 'react-router'

import type { TRouteDescriptor } from '../types'

type TRenderTreeArgs = TRouteDescriptor & {
  _positionIndex: number
}

// Появилось из-за фишки react router https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/components.tsx#L1566
export const renderRouterTree = ({
  children,
  index,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preloader: __LOADER_USED_ONLY_FOR_SSR_DECLARATIVE_MODE__,
  _positionIndex,
  ...rest
}: TRenderTreeArgs) => {
  if (!Array.isArray(children) || !children.length || index) {
    return (
      <ReactRouterRoute
        key={rest.path || _positionIndex}
        index={index}
        {...rest}
      />
    )
  }

  return (
    <ReactRouterRoute key={rest.path || _positionIndex} {...rest}>
      {children.map((props, index) =>
        renderRouterTree({ ...props, _positionIndex: index }),
      )}
    </ReactRouterRoute>
  )
}
