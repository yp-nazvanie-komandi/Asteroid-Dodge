import {
  type NavigateProps as ReactRouterNavigateProps,
  Navigate as ReactRouterNavigate,
} from 'react-router'

import { _serverContextThunk, useAppDispatch } from '../../redux/main'

interface INavigateProps extends ReactRouterNavigateProps {
  serverContext?: ISSRServerContext
}

export const Navigate = ({ to, ...rest }: INavigateProps) => {
  const dispatch = useAppDispatch()

  if (import.meta.env.SSR) {
    /*
        В случае если мы находимся на сервере, то нельзя использовать Navigate из react-router:

        <Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change

        поэтому на сервере мы заполняем serverContext информацией о том куда необходимо выполнить редирект 
        и вместо возврата 200 отправляем 302 на указанный путь
    */
    dispatch(
      _serverContextThunk({
        response: { redirect: typeof to === 'string' ? to : to?.pathname },
      }),
    )

    return null
  }

  return <ReactRouterNavigate to={to} {...rest} />
}
