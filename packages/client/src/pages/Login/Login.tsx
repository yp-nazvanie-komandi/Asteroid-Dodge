import { useState, type FormEvent, type ChangeEvent } from 'react'

import { useNavigate } from 'react-router'

import { Auth } from '../../services/Auth/Auth'

// TODO: НУЖНО ПОЛНОСТЬЮ ПЕРЕДЕЛАТЬ В РАМКАХ https://github.com/yp-nazvanie-komandi/Asteroid-Dodge/issues/7
export const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  const navigate = useNavigate()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { successful, error } = await Auth.getInstance().signin({
        login,
        password,
      })

      if (successful) {
        navigate('/profile')
      } else {
        setError(error?.message || 'Login failed')
      }
    } catch (error) {
      setError('Login failed')
    }
  }

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="login"
        value={login}
        onChange={handleChangeLogin}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handleChangePassword}
      />
      <button type="submit">Login</button>
      {error}
    </form>
  )
}
