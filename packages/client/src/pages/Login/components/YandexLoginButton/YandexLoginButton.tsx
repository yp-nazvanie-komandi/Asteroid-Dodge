import SvgButton from '../../../../components/Button/SvgButton'

import { useLazyGetOauthYandexServiceIdQuery } from '../../../../redux/api/Oauth/generated/api'

import './YandexLoginButton.scss'

interface IYandexLoginButtonProps {
  setSigninError(error: string | undefined): void
}

const DEFAULT_LOGIN_ERROR_MESSAGE =
  'Произошла ошибка при входе. Повторите попытку позже.'

const YandexLoginButton = ({ setSigninError }: IYandexLoginButtonProps) => {
  const [getServiceId, { isLoading, isFetching }] =
    useLazyGetOauthYandexServiceIdQuery()

  const handleLogin = async () => {
    setSigninError(undefined)

    const redirectUrl = new URL('oauth', window.location.origin)

    // TODO: по факту стоит засетить в куки и читать на oauth странице, так как там сейчас читается из window.location.origin
    const redirectUri = redirectUrl.toString()

    try {
      const { service_id } = await getServiceId({ redirectUri }).unwrap()

      const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`

      window.location.href = authUrl
    } catch (error) {
      setSigninError((error as Error)?.message || DEFAULT_LOGIN_ERROR_MESSAGE)
    }
  }

  return (
    <SvgButton
      onClick={handleLogin}
      loading={isLoading || isFetching}
      className="yandex-login-button"
      type="button"
      text="Войти через Яндекс"
      svg={
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z"
            fill="#FC3F1D"
          />
          <path
            d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
            fill="#fff"
          />
        </svg>
      }
    />
  )
}

export default YandexLoginButton
