import { useState } from 'react'
import { useLocation, useNavigate, Link as RouterLink } from 'react-router'
import { useForm } from 'react-hook-form'
import {
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  Link,
} from '@mui/material'

import { usePostAuthSigninMutation } from '../../redux/api/Auth/auth'
import { isFetchBaseQueryErrorWithReason } from '../../redux/api/helpers'

import Button from '../../components/Button/Button'

import './style.scss'

interface ILoginFormValues {
  login: string
  password: string
}

const DEFAULT_LOGIN_ERROR_MESSAGE =
  'Произошла ошибка при входе. Повторите попытку позже.'

const ALREADY_IN_SYSTEM_ERROR_REASON = 'User already in system'

const DEFAULT_AFTER_LOGIN_NAVIGATION_PATH = '/'

const LOGIN_FORM_FIELDS = [
  {
    name: 'login',
    label: 'Login',
    type: 'text',
    placeholder: 'Someone1#',
    autoComplete: 'username',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'current-password',
  },
] as const

export const Login = () => {
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
  })

  const handleLogin = async (values: ILoginFormValues) => {
    setSigninError(undefined)

    try {
      await signinMutate({ signInRequest: values }).unwrap()

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
            },
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
              // TODO: добавить валидацию на форму
              {...register(field.name, {
                required: 'Поле обязательно для заполнения',
              })}
            />
          ))}
        </Stack>

        <Button
          type="submit"
          text="Login"
          size="large"
          loading={isSubmitting}
        />

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
