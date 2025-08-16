interface IServiceIdResponse {
  service_id: string
}

export const getClientID = async () => {
  console.log(import.meta.env.VITE_OAUTH_YANDEX_URI)
  const response = await fetch(
    `${import.meta.env.VITE_OAUTH_YANDEX_URI}/service-id`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Ошибка при получение client_id: ${response.status}`)
  }
  return response.json() as Promise<IServiceIdResponse> // ожидаем, что сервер вернёт созданный объект
}

interface IOuthInput {
  code: string
  redirect_uri: string
}

export const postOauthYandex = async (data: IOuthInput) => {
  const response = await fetch(import.meta.env.VITE_OAUTH_YANDEX_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Ошибка при получение авторизации: ${response.status}`)
  }
  return response.json() // ожидаем, что сервер вернёт созданный объект
}
