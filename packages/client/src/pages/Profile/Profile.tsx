import { useState, type ChangeEvent, type MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link as RouterLink } from 'react-router'

import { Container, Link, Stack, TextField, Typography } from '@mui/material'

import Button from '../../components/Button/Button'

import avatarImg from '/src/assets/img/tmp-avatar.png'

import { type IPasswordFormValues } from './types'

import {
  useGetAuthUserQuery,
  usePostAuthLogoutMutation,
} from '../../redux/api/Auth/auth'

import {
  type ProfileAvatarBody,
  usePutUserPasswordMutation,
  usePutUserProfileAvatarMutation,
} from '../../redux/api/Users/users'

const DEFAULT_ERROR_MESSAGE =
  'Упс, что-то пошло не так. Повторите попытку позже.'

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
    autoComplete: 'new-password',
  },
] as const

export const Profile = () => {
  const [logoutError, setLogoutError] = useState<string>()
  const [passError, setUpdatePassError] = useState<string>()

  const { data: user } = useGetAuthUserQuery()

  const [logoutMutate] = usePostAuthLogoutMutation()
  const [updatePasswordMutate] = usePutUserPasswordMutation()
  const [updateAvatarMutate] = usePutUserProfileAvatarMutation()

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IPasswordFormValues>({
    mode: 'all',
  })

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files

    if (file && file[0]) {
      const formData = new FormData()

      formData.append('avatar', file[0], file[0].name)

      try {
        await updateAvatarMutate({
          profileAvatarBody: formData as unknown as ProfileAvatarBody,
        }).unwrap()
      } catch (err) {
        console.error('Ошибка при обновлении аватара:', err)
      }
    }
  }

  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault()

    try {
      await logoutMutate().unwrap()

      navigate('/login')
    } catch (error) {
      // TODO: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
      setLogoutError((error as Error)?.message || 'Logout failed')
    }
  }

  const handleUpdatePass = async (values: IPasswordFormValues) => {
    setUpdatePassError(undefined)

    try {
      await updatePasswordMutate({
        changePasswordRequest: values,
      }).unwrap()

      navigate('/start')
    } catch (error) {
      // TODO: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
      setUpdatePassError((error as Error)?.message || DEFAULT_ERROR_MESSAGE)
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

      <Container component="form" onSubmit={handleSubmit(handleUpdatePass)}>
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

          <Link
            className="link text-center"
            component={RouterLink}
            to="/login"
            onClick={handleLogout}
          >
            Log out
          </Link>

          {(passError || logoutError) && (
            <Typography marginTop={2} color="error" textAlign="center">
              {passError || logoutError}
            </Typography>
          )}
        </Stack>
      </Container>
    </div>
  )
}
