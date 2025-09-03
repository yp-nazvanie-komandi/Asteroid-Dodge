import { useState } from 'react'
import { useLocation, useNavigate, Link as RouterLink } from 'react-router'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

import {
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  Link,
} from '@mui/material'

import { usePostAuthSigninMutation } from '../../redux/api/Auth/enhanced/api'
import {
  useGetUserThemeQuery,
  useUpdateUserThemeMutation,
} from '../../redux/api/base'

import { isFetchBaseQueryErrorWithReason } from '../../redux/api/helpers'

import type { TFormFieldsSchemas } from '../../utils/types/validation'

import Button from '../../components/Button/Button'

import YandexLoginButton from './components/YandexLoginButton/YandexLoginButton'

import './style.scss'

import { AttachedThemeResponse } from '../../components/Theme/change-theme-drop'

interface ILoginFormValues {
  login: string
  password: string
}

const DEFAULT_LOGIN_ERROR_MESSAGE =
  'Произошла ошибка при входе. Повторите попытку позже.'

const DEFAULT_REQUIRED_FIELD_MESSAGE = 'Поле обязательно для заполнения'

const ALREADY_IN_SYSTEM_ERROR_REASON = 'User already in system'

const DEFAULT_AFTER_LOGIN_NAVIGATION_PATH = '/'

const LOGIN_FORM_FIELDS = [
  {
    name: 'login',
    label: 'Login',
    type: 'text',
    placeholder: 'Someone1#',
    autoComplete: 'username',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(
        /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/,
        'Поле состоит от 3 до 20 символов, латиницы, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'
      ),
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'current-password',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        'Поле состоит от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
      ),
  },
] as const

const LOGIN_FORM_FIELDS_SCHEMA = yup
  .object(
    LOGIN_FORM_FIELDS.reduce((acc, field) => {
      acc[field.name] = field.validation
      return acc
    }, {} as TFormFieldsSchemas<typeof LOGIN_FORM_FIELDS>)
  )
  .required()

// TODO: Вынести в отдельный компонент форму https://github.com/yp-nazvanie-komandi/Asteroid-Dodge/issues/96
export const Login = () => {
  const { data } = useGetUserThemeQuery() as { data?: AttachedThemeResponse }
  const [updateTheme] = useUpdateUserThemeMutation()

  const [signinError, setSigninError] = useState<string>()

  const location = useLocation()

  const [signinMutate] = usePostAuthSigninMutation()

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormValues>({
    mode: 'all',
    resolver: yupResolver(LOGIN_FORM_FIELDS_SCHEMA),
  })

  const handleLogin = async (values: ILoginFormValues) => {
    setSigninError(undefined)

    try {
      await signinMutate({ signInRequest: values }).unwrap()

      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          console.log('Разрешение на уведомления:', permission)
        })
      }
      const cookieMatch = document?.cookie?.match(
        '(^|;)\\s*' + 'theme' + '\\s*=\\s*([^;]+)',
      )
      const themeValue = cookieMatch ? cookieMatch.pop() : undefined

      if (!themeValue) {
        if (data && data.name) {
          document.cookie = `theme=${data.name}; path=/`
        }
      } else {
        updateTheme(themeValue)
      }

      navigate(location.state?.from || DEFAULT_AFTER_LOGIN_NAVIGATION_PATH, {
        replace: true,
      })
    } catch (error) {
      // TODO: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
      if (isFetchBaseQueryErrorWithReason(error)) {
        if (error.data.reason === ALREADY_IN_SYSTEM_ERROR_REASON) {
          navigate(
            location.state?.from || DEFAULT_AFTER_LOGIN_NAVIGATION_PATH,
            {
              replace: true,
            }
          )

          return
        }
      }

      setSigninError((error as Error)?.message || DEFAULT_LOGIN_ERROR_MESSAGE)
    }
  }

  return (
    <Container
      component="form"
      className="login-container"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Stack direction="column">
        <Typography
          component="h1"
          className="title login-title"
          marginBottom={2}
        >
          Login
        </Typography>
        <Divider orientation="horizontal" />
        <Stack spacing={2} direction="column" marginTop={7} marginBottom={4}>
          {LOGIN_FORM_FIELDS.map(field => (
            <TextField
              key={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              label={field.label}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]?.message}
              aria-invalid={errors[field.name] ? true : false}
              {...register(field.name)}
            />
          ))}
        </Stack>

        <Button
          type="submit"
          text="Login"
          size="large"
          loading={isSubmitting}
        />

        <br />

        <YandexLoginButton setSigninError={setSigninError} />

        <Link
          className="link text-center"
          component={RouterLink}
          to="/registration"
        >
          Registration
        </Link>

        {signinError && (
          <Typography marginTop={2} color="error" textAlign="center">
            {signinError}
          </Typography>
        )}
      </Stack>
    </Container>
  )
}
