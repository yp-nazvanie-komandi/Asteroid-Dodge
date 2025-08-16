import { useLazyGetOauthYandexServiceIdQuery } from '../../redux/api/Oauth/oauth'

const redirectUri = 'http://localhost:3000/oauth'

export const TEMP = () => {
  const [getServiceId] = useLazyGetOauthYandexServiceIdQuery()

  const handleLogin = async () => {
    try {
      const { service_id } = await getServiceId({ redirectUri }).unwrap()

      const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}`

      window.location.href = authUrl
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <p>
        ПЕРЕД нажатием на кнопку нужно очистить куки! иначе потом Яндекс вернет
        ошибку 400 User already in system или проверять инкогнито
      </p>
      <button type="button" onClick={handleLogin}>
        Зайти через Яндекс
      </button>
    </>
  )
}
