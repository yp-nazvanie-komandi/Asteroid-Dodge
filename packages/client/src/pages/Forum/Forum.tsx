import './style.scss'
import { ForumTopicPreview } from '../ForumTopic/ForumTopicPreview/ForumTopicPreview'
import { ForumContainer } from '../../components/ForumContainer/ForumContainer'
import { useGetApiV1ForumTopicsQuery } from '../../redux/api/Forum/generated/api'
export const Forum = () => {
  const {
    data: topics,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetApiV1ForumTopicsQuery()

  const loading = isLoading || isFetching

  return (
    <ForumContainer>
      <div className="forum-container">
        <h2 className="forum-container__title">Forum</h2>
        <div className="forum-container__toolbar">
          <button type="button" onClick={() => refetch()}>
            Обновить
          </button>
          <p>тут будет кнопка после слива МР с кнопкой</p>
        </div>
        {loading && <p>Загрузка тем…</p>}
        {error && (
          <div className="forum-container__error">
            <p>Не удалось загрузить темы.</p>
            <button type="button" onClick={() => refetch()}>
              Повторить
            </button>
          </div>
        )}
        {!loading && !error && topics && topics.length === 0 && (
          <p>Пока нет тем. Создайте первую!</p>
        )}
        {!loading && !error && topics && topics.length > 0 && (
          <section className="forum-container__topics">
            {topics.map(topic => (
              <ForumTopicPreview
                key={topic.id}
                id={topic.id}
                title={topic.title}
                text={topic.body}
                avatar={undefined}
                userName={topic.author}
              />
            ))}
          </section>
        )}
      </div>
    </ForumContainer>
  )
}
