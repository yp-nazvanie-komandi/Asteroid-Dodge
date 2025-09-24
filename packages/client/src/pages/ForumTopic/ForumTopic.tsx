import { Paper } from '@mui/material'
import './style.scss'
import { TopicTitles } from '../../components/ForumTopicTitles/TopicTitles'
import { ForumTopicComment } from './ForumTopicComment/ForumTopicComment'
import {
  useGetApiV1ForumTopicsByIdQuery,
  usePostApiV1ForumTopicsByIdCommentsMutation,
} from '../../redux/api/Forum/generated/api'
import { useParams } from 'react-router'
import { Topic } from '../../redux/api/Forum/generated/types'
import { TopicTextAreaInput } from './ForumTopicPreview/TopicTextAreaInput/TopicTextAreaInput'

export const ForumTopic = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const useMock = import.meta.env.VITE_USE_FORUM_MOCK
  const id = Number(topicId)
  const singleTopicMock = {
    id: 3,
    title: 'Стоит ли использовать TypeScript в больших проектах?',
    body: 'Думаю перевести кодовую базу на TypeScript. Какие плюсы/минусы?',
    author: 'Helen',
    ownerId: 'user-852',
    createdAt: '2025-09-22T08:00:00Z',
    updatedAt: '2025-09-24T09:10:00Z',
    comments: [
      {
        id: 301,
        topicId: 3,
        author: 'Ivan',
        body: 'Плюс — строгая типизация, меньше багов. Минус — больше кода и время компиляции.',
        ownerId: 'user-963',
        createdAt: '2025-09-22T08:15:00Z',
        updatedAt: '2025-09-22T08:15:00Z',
      },
      {
        id: 302,
        topicId: 3,
        author: 'Jack',
        body: 'В долгосрочной перспективе экономит кучу времени за счёт автокомплита и контрактов.',
        ownerId: 'user-159',
        createdAt: '2025-09-22T08:30:00Z',
        updatedAt: '2025-09-22T08:30:00Z',
      },
    ],
  }
  if (!topicId) {
    return (
      <Paper className="forum-topic-container" elevation={5}>
        <p>Некорректный идентификатор темы.</p>
      </Paper>
    )
  }
  const { data, isLoading, isFetching, error, refetch } =
    useGetApiV1ForumTopicsByIdQuery({ id }, { skip: useMock })
  const [addComment, { isSuccess }] =
    usePostApiV1ForumTopicsByIdCommentsMutation()

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
  const topic: Topic | undefined = useMock ? singleTopicMock : data
  const loading = useMock ? false : isLoading || isFetching
  const hasError = useMock ? false : Boolean(error)

  return (
    <Paper className="forum-topic-container" elevation={5}>
      {loading && <p>Загрузка темы…</p>}

      {hasError && (
        <div className="forum-topic-error">
          <p>Не удалось загрузить тему.</p>
          <button type="button" onClick={() => refetch()}>
            Повторить
          </button>
        </div>
      )}

      {!loading && !hasError && topic && (
        <>
          <TopicTitles
            title={topic.title}
            text={topic.body}
            author={topic.author}
            id={id}
            hasRedirect={false}
          />
          <div className="forum-topic-comments">
            {(!topic.comments || topic.comments.length === 0) && (
              <p className="forum-topic-comments__empty">
                Комментариев пока нет.
              </p>
            )}
            {topic.comments?.map(comment => (
              <ForumTopicComment
                key={comment.id}
                author={comment.author}
                text={comment.body}
              />
            ))}
            <TopicTextAreaInput submitCallback={onSubmit} />
          </div>
        </>
      )}
    </Paper>
  )
}
