import { ForumTopicPreview } from '../ForumTopic/ForumTopicPreview/ForumTopicPreview'
import { useGetApiV1ForumTopicsQuery } from '../../redux/api/Forum/generated/api'
import type { Topic } from '../../redux/api/Forum/generated/types'

const mockTopics: Topic[] = [
  {
    id: 1,
    title: 'Добро пожаловать на форум 🚀',
    body: 'Здесь можно задавать вопросы и делиться опытом.',
    author: 'Admin',
    ownerId: 'admin-id',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: 2,
    title: 'Первая тема от пользователя',
    body: 'Просто тестирую как работает форум 🙂',
    author: 'User123',
    ownerId: 'user-id-123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  },
]

export const ForumIndex = () => {
  const useMock = true

  const {
    data: apiTopics,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetApiV1ForumTopicsQuery(undefined, { skip: useMock })

  const loading = !useMock && (isLoading || isFetching)
  const topics: Topic[] | undefined = useMock ? mockTopics : apiTopics
  const hasError = !useMock && error

  if (loading) return <p>Загрузка тем…</p>

  if (hasError)
    return (
      <div className="forum-container__error">
        <p>Не удалось загрузить темы.</p>
        <button type="button" onClick={() => refetch()}>
          Повторить
        </button>
      </div>
    )

  if (!topics || topics.length === 0)
    return <p>Пока нет тем. Создайте первую!</p>

  return (
    <section className="forum-container__topics">
      {topics.map(topic => (
        <ForumTopicPreview
          ownerId={topic.ownerId}
          key={topic.id}
          id={topic.id}
          title={topic.title}
          body={topic.body}
          author={topic.author}
          createdAt={topic.createdAt}
          updatedAt={topic.updatedAt}
        />
      ))}
    </section>
  )
}
