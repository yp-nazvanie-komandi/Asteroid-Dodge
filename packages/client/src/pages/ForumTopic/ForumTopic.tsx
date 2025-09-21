import { Paper } from '@mui/material'
import './style.scss'
import { TopicTitles } from '../../components/ForumTopicTitles/TopicTitles'
import { ForumTopicComment } from './ForumTopicComment/ForumTopicComment'
import { useGetApiV1ForumTopicsByIdQuery } from '../../redux/api/Forum/generated/api'
import { useParams } from 'react-router'

export const ForumTopic = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const id = Number(topicId)

  if (!topicId || Number.isNaN(id)) {
    return (
      <Paper className="forum-topic-container" elevation={5}>
        <p>Некорректный идентификатор темы.</p>
      </Paper>
    )
  }

  const {
    data: topic,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetApiV1ForumTopicsByIdQuery({ id })
  const loading = isLoading || isFetching

  return (
    <Paper className="forum-topic-container" elevation={5}>
      <div className="forum-topic-header">
        <h2 className="sr-only">Тема форума</h2>
        <div className="forum-topic-toolbar">
          <button type="button" onClick={() => refetch()}>
            Обновить
          </button>
        </div>
      </div>

      {loading && <p>Загрузка темы…</p>}

      {error && (
        <div className="forum-topic-error">
          <p>Не удалось загрузить тему.</p>
          <button type="button" onClick={() => refetch()}>
            Повторить
          </button>
        </div>
      )}

      {!loading && !error && topic && (
        <>
          <TopicTitles
            title={topic.title}
            text={topic.body}
            author={topic.author}
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
          </div>
        </>
      )}
    </Paper>
  )
}
