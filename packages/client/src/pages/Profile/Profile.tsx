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
} from '../../redux/api/Auth/enhanced/api'

import type { ProfileAvatarBody } from '../../redux/api/Users/generated/types'
import {
  usePutUserPasswordMutation,
  usePutUserProfileAvatarMutation,
} from '../../redux/api/Users/enhanced/api'

const DEFAULT_ERROR_MESSAGE =
  'Oops, something went wrong. Repeat the attempt later.'

const DEFAULT_REQUIRED_FIELD_MESSAGE = 'The field is mandatory for filling out'

const PASSWORD_FORM_FIELDS = [
  {
    name: 'oldPassword',
    label: 'Old Password',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'current-password',
    validation: yup.string().required(DEFAULT_REQUIRED_FIELD_MESSAGE),
  },
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'new-password',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        'The field consists of 8 to 40 characters, always at least one title letter and figure',
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
              src={`${__API_MODE__ === 'ssr' || import.meta.env.SSR ? __SSR_YP_API_BASE_URL__ : __YP_API_BASE_URL__}/resources${user.avatar}`}
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
