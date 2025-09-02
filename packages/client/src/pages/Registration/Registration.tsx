import { useState } from 'react'

import { useNavigate, Link as RouterLink } from 'react-router'

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

import { usePostAuthSignupMutation } from '../../redux/api/Auth/enhanced/api'

import type { TFormFieldsSchemas } from '../../utils/types/validation'

import Button from '../../components/Button/Button'

import './style.scss'

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

const DEFAULT_REQUIRED_FIELD_MESSAGE = 'Поле обязательно для заполнения'

const NAMES_REGEX = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/
const NAMES_FIELDS_MESSAGE =
  'Поле состоит из латиницы или кириллицы, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'

const REGISTRATION_FORM_FIELDS = [
  {
    name: 'first_name',
    label: 'First name',
    type: 'text',
    placeholder: 'Somename',
    autoComplete: 'given-name',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(NAMES_REGEX, NAMES_FIELDS_MESSAGE),
  },
  {
    name: 'second_name',
    label: 'Second name',
    type: 'text',
    placeholder: 'Somesecondname',
    autoComplete: 'family-name',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(NAMES_REGEX, NAMES_FIELDS_MESSAGE),
  },
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
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Someone@mail.com',
    autoComplete: 'email',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(
        /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
        'Поле состоит из латиницы, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы'
      ),
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '*************',
    autoComplete: 'new-password',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        'Поле состоит от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
      ),
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+0000000000000',
    autoComplete: 'tel',
    validation: yup
      .string()
      .required(DEFAULT_REQUIRED_FIELD_MESSAGE)
      .matches(
        /^\+?[0-9]{10,15}$/,
        'Поле состоит от 10 до 15 символов, из цифр, может начинается с плюса'
      ),
  },
] as const

const REGISTRATION_FORM_FIELDS_SCHEMA = yup
  .object(
    REGISTRATION_FORM_FIELDS.reduce((acc, field) => {
      acc[field.name] = field.validation
      return acc
    }, {} as TFormFieldsSchemas<typeof REGISTRATION_FORM_FIELDS>)
  )
  .required()

// TODO: Вынести в отдельный компонент форму https://github.com/yp-nazvanie-komandi/Asteroid-Dodge/issues/96
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
    resolver: yupResolver(REGISTRATION_FORM_FIELDS_SCHEMA),
  })

  const handleRegistration = async (values: IRegistrationFormValues) => {
    setSignupError(undefined)

    try {
      await signupMutate({ signUpRequest: values }).unwrap()

      navigate('/profile')
    } catch (error) {
      // TODO: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
      setSignupError(
        (error as Error)?.message || DEFAULT_REGISTRATION_ERROR_MESSAGE
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
              {...register(field.name)}
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
