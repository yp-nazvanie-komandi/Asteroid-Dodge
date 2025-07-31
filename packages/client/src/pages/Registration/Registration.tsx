import { useState } from 'react'

import { useNavigate } from 'react-router'

import { useForm } from 'react-hook-form'

import { Container, Divider, Stack, TextField, Typography } from '@mui/material'

import { usePostAuthSignupMutation } from '../../redux/api/Auth/auth'

import Button from '../../components/Button/Button'

import './style.scss'

import { Link as RouterLink } from 'react-router'
import { Link } from '@mui/material'

interface IRegistrationFormValues {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

const DEFAULT_REGISTRATION_ERROR_MESSAGE =
  'Произошла ошибка при регистрации. Повторите попытку позже.'

const REGISTRATION_FORM_FIELDS = [
  {
    name: 'first_name',
    label: 'First name',
    type: 'text',
    placeholder: 'Somename',
    autoComplete: 'given-name',
  },
  {
    name: 'second_name',
    label: 'Second name',
    type: 'text',
    placeholder: 'Somesecondname',
    autoComplete: 'family-name',
  },
  {
    name: 'login',
    label: 'Login',
    type: 'text',
    placeholder: 'Someone1#',
    autoComplete: 'username',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Someone@mail.com',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'new-password',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+0000000000000',
    autoComplete: 'tel',
  },
] as const

export const Registration = () => {
  const [signupError, setSignupError] = useState<string>()

  const [signupMutate] = usePostAuthSignupMutation()

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IRegistrationFormValues>({
    mode: 'all',
  })

  const handleRegistration = async (values: IRegistrationFormValues) => {
    setSignupError(undefined)

    try {
      await signupMutate({ signUpRequest: values }).unwrap()

      navigate('/profile')
    } catch (error) {
      setSignupError(
        (error as Error)?.message || DEFAULT_REGISTRATION_ERROR_MESSAGE,
      )
    }
  }

  return (
    <Container
      component="form"
      className="registration-container"
      onSubmit={handleSubmit(handleRegistration)}
    >
      <Stack direction="column">
        <Typography
          component="h1"
          className="title registration-title"
          marginBottom={2}
        >
          Registration
        </Typography>

        <Divider orientation="horizontal" />

        <Stack spacing={2} direction="column" marginTop={7} marginBottom={4}>
          {REGISTRATION_FORM_FIELDS.map(field => (
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
          text="Register"
          size="large"
          loading={isSubmitting}
        />

        <Link className="link text-center" component={RouterLink} to="/login">
          Login
        </Link>

        {signupError && (
          <Typography marginTop={2} color="error" textAlign="center">
            {signupError}
          </Typography>
        )}
      </Stack>
    </Container>
  )
}
