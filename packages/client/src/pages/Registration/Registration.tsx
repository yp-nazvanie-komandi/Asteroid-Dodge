import { useState, type FormEvent, type ChangeEvent } from 'react'

import { useNavigate } from 'react-router'

import { Auth } from '../../services/Auth/Auth'

// TODO: НУЖНО ПОЛНОСТЬЮ ПЕРЕДЕЛАТЬ В РАМКАХ https://github.com/yp-nazvanie-komandi/Asteroid-Dodge/issues/11
export const Registration = () => {
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string>()

  const navigate = useNavigate()

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { successful, error } = await Auth.getInstance().signup({
        first_name: firstName,
        second_name: secondName,
        email,
        login,
        password,
        phone,
      })

      if (successful) {
        navigate('/profile')
      } else {
        setError(error?.message || 'Registration failed')
      }
    } catch (error) {
      setError('Registration failed')
    }
  }

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value)
  }

  const handleChangeSecondName = (event: ChangeEvent<HTMLInputElement>) => {
    setSecondName(event.target.value)
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value)
  }

  return (
    <form onSubmit={handleRegistration}>
      <input
        type="text"
        placeholder="first name"
        value={firstName}
        onChange={handleChangeFirstName}
      />
      <input
        type="text"
        placeholder="second name"
        value={secondName}
        onChange={handleChangeSecondName}
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        type="text"
        placeholder="phone"
        value={phone}
        onChange={handleChangePhone}
      />
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
      <button type="submit">Register</button>
      {error}
    </form>
  )
}
