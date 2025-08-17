import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { usePostOauthYandexMutation } from '../../redux/api/Oauth/oauth'
import { isFetchBaseQueryErrorWithReason } from '../../redux/api/helpers'
import { CircularProgress, Container } from '@mui/material'

const redirectUri = import.meta.env.VITE_REDIRECT_URI
const ALREADY_IN_SYSTEM_ERROR_REASON = 'User already in system'

export const Oauth = () => {
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  const [postOauthYandex] = usePostOauthYandexMutation()

  // Даже в стрикт моде очень желательно вызвать мутацию ровно 1 раз
  const mutationCallerRef = useRef(false)

  useEffect(() => {
    console.log(searchParams)

    if (!mutationCallerRef.current) {
      mutationCallerRef.current = true

      const code = searchParams.get('code')

      if (code) {
        setIsLoading(true)
        postOauthYandex({
          oauthSignInRequest: {
            code,
            redirect_uri: redirectUri,
          },
        })
          .unwrap()
          .then(data => {
            console.log(data)
            navigate('/')
          })
          .catch(error => {
            console.error(error)
            if (isFetchBaseQueryErrorWithReason(error)) {
              if (error.data.reason === ALREADY_IN_SYSTEM_ERROR_REASON) {
                navigate('/')
                return
              }
            }
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        console.error('Код авторизации не найден')
        setIsLoading(false)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <Container fixed className="router-loader">
        <CircularProgress />
      </Container>
    )
  }

  return <pre>{JSON.stringify(Object.fromEntries(searchParams))}</pre>
}
