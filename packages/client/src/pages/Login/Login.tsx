import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Container, Divider, Stack, TextField, Typography } from '@mui/material'

import { usePostAuthSigninMutation } from '../../redux/api/Auth/auth'

import Button from '../../components/Button/Button'
import { Link } from '../../components/Link/Link'

import './style.scss'

interface ILoginFormValues {
  login: string
  password: string
}

const DEFAULT_LOGIN_ERROR_MESSAGE =
  'Произошла ошибка при входе. Повторите попытку позже.'

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

      navigate('/')
    } catch (error) {
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

        <Link>
          <a className="text-center" href="/registration">
            Registration
          </a>
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
