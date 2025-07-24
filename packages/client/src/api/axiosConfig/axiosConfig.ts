import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  response => {
    console.log('[API Response]', response)
    return response
  },
  error => {
    console.error('[API Error]', error)

    if (error.response && error.response.status === 401) {
      console.warn('Неавторизованный пользователь. Перенаправление на /login')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
