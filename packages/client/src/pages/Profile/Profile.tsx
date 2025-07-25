import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Auth } from '../../services/Auth/Auth'
import { User } from '../../services/User'
import { IUser, IPasswordFormValues } from './types'
import { Container, Divider, Stack, TextField, Typography } from '@mui/material'
import Button from '../../components/Button/Button'

import avatarImg from '/src/assets/img/tmp-avatar.png'

export const Profile = () => {
  const [error, setError] = useState<string>()
  const [user, setUser] = useState<IUser>()
  const [signinError, setSigninError] = useState<string>()

  const navigate = useNavigate()

  const getUserData = async () => {
    try {
      const { data } = await Auth.getInstance().getUserData()
      if (data) {
        setUser(data)
      }
    } catch (err) {
      setError('Не удалось загрузить данные пользователя')
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files
    if (file && file[0]) {
      const formData = new FormData()
      formData.append('avatar', file[0], file[0].name)

      try {
        const { successful, error } = await User.getInstance().updateAvatar(
          formData
        )
        if (successful) {
          await getUserData()
        } else {
          console.error('Ошибка при обновлении аватара:', error)
        }
      } catch (err) {
        console.error('Произошла ошибка:', err)
      }
    }
  }

  const FORM_FIELDS = [
    {
      name: 'oldPassword',
      label: 'Старый пароль',
      type: 'password',
      placeholder: '*************',
      autoComplete: 'current-password',
    },
    {
      name: 'newPassword',
      label: 'Новый пароль',
      type: 'password',
      placeholder: '*************',
      autoComplete: 'current-password',
    },
  ]
  const DEFAULT_ERROR_MESSAGE =
    'Упс, что-то пошло не так. Повторите попытку позже.'

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IPasswordFormValues>({
    mode: 'all',
  })
  const handleLogin = async (values: IPasswordFormValues) => {
    setSigninError(undefined)
    try {
      const { successful, error } = await User.getInstance().updatePassword(
        values
      )

      if (successful) {
        navigate('/start')
      } else {
        setSigninError(error?.message || DEFAULT_ERROR_MESSAGE)
      }
    } catch (error) {
      setSigninError((error as Error)?.message || DEFAULT_ERROR_MESSAGE)
    }
  }

  const handleLogout = async () => {
    try {
      const { successful, error } = await Auth.getInstance().logout()

      if (successful) {
        navigate('/login')
      } else {
        setError(error?.message || 'Ошибка при выходе')
      }
    } catch (error) {
      setError('Ошибка при выходе')
    }
  }

  return (
    <div className="container container-profile">
      <div className="profile-user">
        <label>
          {user?.avatar ? (
            <img
              src={'https://ya-praktikum.tech/api/v2/resources/' + user?.avatar}
              alt="Preview"
            />
          ) : (
            <img src={avatarImg} alt="avatar" />
          )}

          <input type="file" accept="image/*" onChange={handleFileChange} />

          <p> upload photo</p>
        </label>

        <p>{user?.first_name}</p>
      </div>

      <Container component="form" onSubmit={handleSubmit(handleLogin)}>
        <Stack spacing={2} padding={0} direction="column">
          <Stack spacing={2} direction="column">
            {FORM_FIELDS.map(field => (
              <TextField
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                label={field.label}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]?.message}
                aria-invalid={errors[field.name] ? true : false}
                // TODO: добавить валидацию на форму
                {...register(field?.name, {
                  required: 'Поле обязательно для заполнения',
                })}
              />
            ))}
          </Stack>
          <Button
            type="submit"
            text="Change Password"
            size="large"
            loading={isSubmitting}
          />
          {signinError && (
            <Typography marginTop={2} color="error" textAlign="center">
              {signinError}
            </Typography>
          )}
        </Stack>
      </Container>
    </div>
  )
}
