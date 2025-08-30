import { Paper } from '@mui/material'
import './style.scss'
import { TopicTitles } from '../../components/ForumTopicTitles/TopicTitles'
import { ForumContainer } from '../../components/ForumContainer/ForumContainer'
import { useParams } from 'react-router'
import { ForumTopicComment } from './ForumTopicComment/ForumTopicComment'
import { useGetApiV1ForumTopicsByIdQuery } from '../../redux/api/Forum/generated/api'

export const ForumTopic = () => {
  const params = useParams<{ id: string }>()
  const topicId = Number(params.id)

  if (!params.id || Number.isNaN(topicId)) {
    return (
      <ForumContainer>
        <Paper className="forum-topic-container" elevation={5}>
          <p>Некорректный идентификатор темы.</p>
        </Paper>
      </ForumContainer>
    )
  }

  const {
    data: topic,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetApiV1ForumTopicsByIdQuery({ id: topicId })

  const loading = isLoading || isFetching

  return (
    <ForumContainer>
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
              avatar={undefined}
              userName={topic.author}
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
                  avatar={undefined}
                  userName={comment.author}
                  text={comment.body}
                />
              ))}
            </div>
          </>
        )}
      </Paper>
    </ForumContainer>
  )
}
