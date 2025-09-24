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
  'An error occurred during registration. Repeat the attempt later.'

const DEFAULT_REQUIRED_FIELD_MESSAGE = 'The field is mandatory for filling out'

const NAMES_REGEX = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/
const NAMES_FIELDS_MESSAGE =
  "The field consists of Latin or Cyrillic alphabet, the first letter should be title, without gaps and without numbers, there are no special systems (let's only have a hyphen)"

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
        'The field consists of 3 to 20 characters, Latin, may contain numbers, but not consist of them, without spaces, without special systems (permissible hyphen and lower emphasis)',
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
        'The field consists of Latin, can include numbers and special systems like a hyphen and emphasizing, there must be a “dog” (@) and a point after it, but there must be letters in front of the point',
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
        'The field consists of 8 to 40 characters, always at least one title letter and figure',
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
        'The field consists of 10 to 15 characters, of the numbers, it can begin with the plus',
      ),
  },
] as const

const REGISTRATION_FORM_FIELDS_SCHEMA = yup
  .object(
    REGISTRATION_FORM_FIELDS.reduce(
      (acc, field) => {
        acc[field.name] = field.validation
        return acc
      },
      {} as TFormFieldsSchemas<typeof REGISTRATION_FORM_FIELDS>,
    ),
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
