import { useState } from 'react'

import { useNavigate } from 'react-router'

import { Auth } from '../../services/Auth/Auth'

// TODO: ПОЛНОСТЬЮ ПЕРЕДЕЛАТЬ В РАМКАХ ТАСКИ СТРАНИЦЫ ПРОФИЛЯ
export const Profile = () => {
  const [error, setError] = useState<string>()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const { successful, error } = await Auth.getInstance().logout()

      if (successful) {
        navigate('/login')
      } else {
        setError(error?.message || 'Logout failed')
      }
    } catch (error) {
      setError('Logout failed')
    }
  }

  return (
    <div>
      Profile <button onClick={handleLogout}>Выйти</button>
      {error}
    </div>
  )
}
