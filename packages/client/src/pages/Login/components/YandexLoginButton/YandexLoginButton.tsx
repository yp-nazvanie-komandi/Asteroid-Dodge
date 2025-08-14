import React, { useEffect, useState } from 'react'
import { getClientID } from '../../../../services/oauth'

const YandexLoginButton = () => {
  const [clientId, setClientId] = useState('')
  const redirectUri = import.meta.env.VITE_REDIRECT_URI

  const handleLogin = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`
    window.location.href = authUrl
  }

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const { service_id: clientResultId } = await getClientID()
        console.log('Получен Client ID:', clientResultId)
        setClientId(clientResultId)
      } catch (error) {
        console.error(
          'Ошибка:',
          error instanceof Error ? error.message : 'Неизвестная ошибка'
        )
      }
    }
    loadAuthData()
  })

  return (
    <button
      onClick={handleLogin}
      className={`yandex-login-button`}
      type="button"
      style={{
        backgroundColor: '#FFCC00',
        color: '#000',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 'bold',
      }}
    >
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
      Войти через Яндекс
    </button>
  )
}

export default YandexLoginButton
