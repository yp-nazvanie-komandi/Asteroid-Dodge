import { useForm, SubmitHandler } from 'react-hook-form'
import { Paper, TextField, Button, Box, Typography } from '@mui/material'
import { usePostApiV1ForumTopicsMutation } from '../../redux/api/Forum/generated/api'
import { useNavigate } from 'react-router'

type TCreateTopicForm = { title: string; body: string }

export const CreateForumTopic = () => {
  const navigate = useNavigate()
  const [createTopic, { isLoading, isError, error, isSuccess }] =
    usePostApiV1ForumTopicsMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<TCreateTopicForm>({ mode: 'onChange' })

  const getErrorMessage = (err: unknown) => {
    if (typeof err === 'object' && err !== null) {
      const e: any = err
      if (e?.data?.error) return String(e.data.error)
      if (e?.data?.reason) return String(e.data.reason)
      if (e?.error) return String(e.error)
      try {
        return JSON.stringify(err)
      } catch {
        return 'Unknown error'
      }
    }
    return String(err ?? 'Unknown error')
  }

  const onSubmit: SubmitHandler<TCreateTopicForm> = async data => {
    const res = await createTopic({
      createTopicRequest: { title: data.title, body: data.body },
    }).unwrap()
    reset()
    if (res?.id) navigate(`/topics/${res.id}`)
  }

  const sending = isLoading || isSubmitting

  return (
    <Paper elevation={5} sx={{ p: 3, maxWidth: 720, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create topic
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Topic name"
          fullWidth
          margin="normal"
          {...register('title', {
            required: 'Set topic name',
            minLength: { value: 3, message: 'Min 3 symbols' },
            maxLength: { value: 255, message: 'Max 255 sybmols' },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          disabled={sending}
        />

        <TextField
          label="Text"
          fullWidth
          margin="normal"
          multiline
          rows={6}
          {...register('body', {
            required: 'Enter topic text',
            minLength: { value: 1, message: 'Min 1 sybmol' },
          })}
          error={!!errors.body}
          helperText={errors.body?.message}
          disabled={sending}
        />

        {isError && (
          <Typography color="error" sx={{ mt: 1 }}>
            Ошибка: {getErrorMessage(error)}
          </Typography>
        )}
        {isSuccess && (
          <Typography color="success.main" sx={{ mt: 1 }}>
            Тема создана, выполняю переход…
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || sending}
          >
            {sending ? 'Creating…' : 'Create topic'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            disabled={sending}
            onClick={() => reset()}
          >
            Очистить
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
