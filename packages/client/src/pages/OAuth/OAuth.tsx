import { useEffect, useRef } from 'react'

import { useLocation, useNavigate, useSearchParams } from 'react-router'

import { CircularProgress, Container } from '@mui/material'

import { usePostOauthYandexMutation } from '../../redux/api/Oauth/generated/api'

import { isFetchBaseQueryErrorWithReason } from '../../redux/api/helpers'

const ALREADY_IN_SYSTEM_ERROR_REASON = 'User already in system'

const DEFAULT_AFTER_LOGIN_NAVIGATION_PATH = '/'

export const OAuth = () => {
  const [searchParams] = useSearchParams()

  const location = useLocation()

  const navigate = useNavigate()

  const [postOauthYandex] = usePostOauthYandexMutation()

  // Даже в стрикт моде очень желательно вызвать мутацию ровно 1 раз
  const mutationCallerRef = useRef(false)

  // Выполняется только на клиенте тк в любом случае нужен заход на https://oauth.yandex.ru/authorize
  useEffect(() => {
    if (!mutationCallerRef.current) {
      mutationCallerRef.current = true

      const code = searchParams.get('code')

      if (code) {
        const redirectUrl = new URL('oauth', window.location.origin)

        // TODO: по факту стоит засетить в куки и читать на oauth странице, так как там сейчас читается из window.location.origin
        const redirectUri = redirectUrl.toString()

        postOauthYandex({
          oauthSignInRequest: {
            code,
            redirect_uri: redirectUri,
          },
        })
          .unwrap()
          .then(() => {
            navigate(
              location.state?.from || DEFAULT_AFTER_LOGIN_NAVIGATION_PATH,
              {
                replace: true,
              }
            )
          })
          .catch(error => {
            // TODO: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
            if (isFetchBaseQueryErrorWithReason(error)) {
              if (error.data.reason === ALREADY_IN_SYSTEM_ERROR_REASON) {
                navigate(
                  location.state?.from || DEFAULT_AFTER_LOGIN_NAVIGATION_PATH,
                  {
                    replace: true,
                  }
                )

                return
              }
            }

            // TODO: добавить глобальную ошибку в алерт
            console.error(error)

            navigate('/login', {
              replace: true,
            })
          })
      } else {
        // TODO: добавить глобальную ошибку в алерт
        console.error('Отсутствует код для авторизации')

        navigate('/login', {
          replace: true,
        })
      }
    }
  }, [])

  // TODO: вынести в отдельный компонент тк стили сейчас не вешаются
  return (
    <Container fixed className="router-loader">
      <CircularProgress />
    </Container>
  )
}
