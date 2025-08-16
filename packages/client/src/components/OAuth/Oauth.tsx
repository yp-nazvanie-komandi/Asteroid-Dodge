import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
//import { usePostOauthYandexMutation } from '../../redux/api/Oauth/oauth'
import { useNavigate } from 'react-router'
import { postOauthYandex } from '../../services/oauth'

export const Oauth = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  //const [postOauthYandex] = usePostOauthYandexMutation()

  // Даже в стрикт моде очень желательно вызвать мутацию ровно 1 раз
  const mutationCallerRef = useRef(false)

  useEffect(() => {
    console.log(searchParams)

    if (!mutationCallerRef.current) {
      mutationCallerRef.current = true

      // TODO: унести название параметра в константу
      const code = searchParams.get('code')

      if (code) {
        postOauthYandex({
          code,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        })
          .then(responce => {
            console.log(responce)
            navigate('/') // Main
          })
          .catch(error => {
            console.log(`Ошибка авторизации: ${error}`)
          })
      } else {
        navigate('/login')
      }
    }
  }, [])

  // TODO: можно зафигачить лоадер
  return <pre>{JSON.stringify(Object.fromEntries(searchParams))}</pre>
}
