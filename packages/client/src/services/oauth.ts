interface IServiceIdResponse {
  service_id: string
}

export const getClientID = async () => {
  const response = await fetch(
    `https://ya-praktikum.tech/api/v2/oauth/yandex/service-id`,
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
