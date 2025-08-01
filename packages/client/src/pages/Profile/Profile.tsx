import { useState, type ChangeEvent, type MouseEvent } from 'react'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import { useNavigate, Link as RouterLink } from 'react-router'

import { Container, Link, Stack, TextField, Typography } from '@mui/material'

import Button from '../../components/Button/Button'

import avatarImg from '/src/assets/img/tmp-avatar.png'

import { type IPasswordFormValues } from './types'

import type { TFormFieldsSchemas } from '../../utils/types/validation'

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

const DEFAULT_REQUIRED_FIELD_MESSAGE = 'Поле обязательно для заполнения'

const PASSWORD_FORM_FIELDS = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'current-password',
    validation: yup.string().required(DEFAULT_REQUIRED_FIELD_MESSAGE),
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'new-password',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        'Поле состоит от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      ),
  },
] as const

const PASSWORDS_FORM_FIELDS_SCHEMA = yup
  .object(
    PASSWORD_FORM_FIELDS.reduce(
      (acc, field) => {
        acc[field.name] = field.validation
        return acc
      },
      {} as TFormFieldsSchemas<typeof PASSWORD_FORM_FIELDS>,
    ),
  )
  .required()

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
    resolver: yupResolver(PASSWORDS_FORM_FIELDS_SCHEMA),
  })

  // TODO: Вынести в отдельный компонент и добавить валидацию для файлов https://github.com/yp-nazvanie-komandi/Asteroid-Dodge/issues/96
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
            {PASSWORD_FORM_FIELDS.map(field => (
              <TextField
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                label={field.label}
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]?.message}
                aria-invalid={errors[field.name] ? true : false}
                {...register(field?.name)}
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
