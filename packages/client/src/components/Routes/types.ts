import { type RouteProps as ReactRouterRouteProps } from 'react-router'

import { TAppStore } from '../../redux/types'

export type TRoutePreloader = (
  args: IRoutePreloaderArgs,
) => void | Promise<void>

// Внимание! loader не будет передаваться в Route компоненты, т.к. в настоящий момент используется declarative mode роутера, также количество пропсов в дескрипторе маршрута сильно обрезано от оригинального RouteProps
interface TRouteDescriptorBase
  extends Pick<ReactRouterRouteProps, 'path' | 'Component'> {
  preloader?: TRoutePreloader
}

// У index роутов не должно быть children https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/components.tsx#L959
interface IRouteDescriptorIndex {
  index?: true
  children?: undefined
}

interface IRouteDescriptorNotIndex {
  index?: false
  children?: TRouteDescriptor[]
}

export type TRouteDescriptor = TRouteDescriptorBase &
  (IRouteDescriptorIndex | IRouteDescriptorNotIndex)

interface IRoutePreloaderArgs {
  store: TAppStore
}
