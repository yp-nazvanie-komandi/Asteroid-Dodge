import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { usePostOauthYandexMutation } from '../../redux/api/Oauth/oauth'

const redirectUri = import.meta.env.VITE_REDIRECT_URI

export const Oauth = () => {
  const [searchParams] = useSearchParams()

  const [postOauthYandex] = usePostOauthYandexMutation()

  // Даже в стрикт моде очень желательно вызвать мутацию ровно 1 раз
  const mutationCallerRef = useRef(false)

  useEffect(() => {
    console.log(searchParams)

    if (!mutationCallerRef.current) {
      mutationCallerRef.current = true

      const code = searchParams.get('code')

      if (code) {
        postOauthYandex({
          oauthSignInRequest: {
            code,
            redirect_uri: redirectUri,
          },
        })
          .unwrap()
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        console.error('Код авторизации не найден')
      }
    }
  }, [])

  return <pre>{JSON.stringify(Object.fromEntries(searchParams))}</pre>
}
