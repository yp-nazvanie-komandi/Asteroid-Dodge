interface IServiceIdResponse {
  service_id: string
}

export const getClientID = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_OAUTH_YANDEX_URI}/service-id?redirect_uri=${
      import.meta.env.VITE_REDIRECT_URI
    }`,
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
