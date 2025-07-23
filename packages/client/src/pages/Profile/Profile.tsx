import { useState } from 'react'

import { useNavigate } from 'react-router'

import { usePostAuthLogoutMutation } from '../../redux/api/Auth/auth'

// TODO: ПОЛНОСТЬЮ ПЕРЕДЕЛАТЬ В РАМКАХ ТАСКИ СТРАНИЦЫ ПРОФИЛЯ
export const Profile = () => {
  const [error, setError] = useState<string>()

  const [logoutMutate] = usePostAuthLogoutMutation()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutMutate().unwrap()

      navigate('/login')
    } catch (error) {
      setError((error as Error)?.message || 'Logout failed')
    }
  }

  return (
    <div>
      Profile <button onClick={handleLogout}>Выйти</button>
      {error}
    </div>
  )
}
