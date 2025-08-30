import { TForumTopicProps } from './types'
import { TopicTextAreaInput } from './TopicTextAreaInput/TopicTextAreaInput'
import { Paper } from '@mui/material'
import { TopicTitles } from '../../../components/ForumTopicTitles/TopicTitles'
import { usePostApiV1ForumTopicsByIdCommentsMutation } from '../../../redux/api/Forum/generated/api'

export const ForumTopicPreview = ({
  id,
  avatar,
  title,
  text,
  userName,
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
      console.log('Комментарий добавлен')
    } catch (e) {
      console.error('Ошибка при добавлении комментария', e)
    }
  }

  return (
    <Paper elevation={5}>
      <TopicTitles
        title={title}
        text={text}
        avatar={avatar}
        userName={userName}
      />
      <div className="forum-topic__descriptions">
        <TopicTextAreaInput submitCallback={onSubmit} />
        {isSendingComment && <p>Отправляем комментарий…</p>}
        {isError && (
          <p>
            Ошибка:{' '}
            {typeof error === 'object' ? JSON.stringify(error) : String(error)}
          </p>
        )}
        {isSuccess && <p>Комментарий успешно добавлен</p>}
      </div>
    </Paper>
  )
}
