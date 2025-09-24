import { TForumTopicProps } from './types'
import { TopicTextAreaInput } from './TopicTextAreaInput/TopicTextAreaInput'
import { Paper } from '@mui/material'
import { TopicTitles } from '../../../components/ForumTopicTitles/TopicTitles'
import { usePostApiV1ForumTopicsByIdCommentsMutation } from '../../../redux/api/Forum/generated/api'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

function getErrorMessage(err: unknown) {
  const e = err as FetchBaseQueryError | SerializedError | undefined
  if (!e) return ''
  if ('status' in (e as FetchBaseQueryError)) {
    const fbqe = e as FetchBaseQueryError
    if (typeof fbqe.data === 'string') return fbqe.data
    if (typeof fbqe.data === 'object' && fbqe.data) {
      const maybeMsg = (fbqe.data as any).message ?? (fbqe.data as any).error
      if (maybeMsg) return String(maybeMsg)
      return JSON.stringify(fbqe.data)
    }
    return `HTTP ${String(fbqe.status)}`
  }
  if ('message' in (e as SerializedError) && (e as SerializedError).message) {
    return String((e as SerializedError).message)
  }
  return JSON.stringify(e)
}

export const ForumTopicPreview = ({
  id,
  title,
  body,
  author,
  refetch,
}: TForumTopicProps) => {
  const [
    addComment,
    { isLoading: isSendingComment, isError, error, isSuccess },
  ] = usePostApiV1ForumTopicsByIdCommentsMutation()

  const onSubmit = async (form: { comment: string }) => {
    try {
      await addComment({
        id,
        createCommentRequest: { body: form.comment },
      }).unwrap()
      if (isSuccess) refetch()
    } catch (e) {
      console.error('Ошибка при добавлении комментария', e)
    }
  }

  return (
    <Paper elevation={5}>
      <TopicTitles id={id} title={title} text={body} author={author} />
      <div className="forum-topic__descriptions">
        <TopicTextAreaInput submitCallback={onSubmit} />
        {isSendingComment && <p>Отправляем комментарий…</p>}
        {isError && <p>Ошибка: {getErrorMessage(error)}</p>}
        {isSuccess && <p>Комментарий успешно добавлен</p>}
      </div>
    </Paper>
  )
}
