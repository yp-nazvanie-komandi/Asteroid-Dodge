import { ForumTopicPreview } from '../ForumTopic/ForumTopicPreview/ForumTopicPreview'
import { useGetApiV1ForumTopicsQuery } from '../../redux/api/Forum/generated/api'
import type { Topic } from '../../redux/api/Forum/generated/types'

const topicsMock: Array<Topic> = [
  {
    id: 1,
    title: 'Как настроить JWT аутентификацию?',
    body: 'Столкнулся с проблемой настройки JWT в Express. Поделитесь опытом!',
    author: 'Alice',
    ownerId: 'user-123',
    createdAt: '2025-09-24T10:15:00Z',
    updatedAt: '2025-09-24T10:15:00Z',
    comments: [
      {
        id: 101,
        topicId: 1,
        author: 'Bob',
        body: 'Я обычно использую библиотеку jsonwebtoken. Главное — хранить секрет в .env.',
        ownerId: 'user-456',
        createdAt: '2025-09-24T11:00:00Z',
        updatedAt: '2025-09-24T11:00:00Z',
      },
      {
        id: 103,
        topicId: 1,
        author: 'Eve',
        body: 'Не забудь про срок жизни токена, иначе может быть дыра в безопасности.',
        ownerId: 'user-654',
        createdAt: '2025-09-24T12:00:00Z',
        updatedAt: '2025-09-24T12:00:00Z',
        replies: [],
      },
    ],
  },
  {
    id: 2,
    title: 'Лучшие практики работы с PostgreSQL',
    body: 'Подскажите, как правильно организовать индексы?',
    author: 'Dave',
    ownerId: 'user-321',
    createdAt: '2025-09-23T09:00:00Z',
    updatedAt: '2025-09-23T09:00:00Z',
    comments: [
      {
        id: 102,
        topicId: 2,
        author: 'Eve',
        body: 'Смотри на EXPLAIN ANALYZE, это лучший инструмент для оптимизации запросов.',
        ownerId: 'user-654',
        createdAt: '2025-09-23T09:15:00Z',
        updatedAt: '2025-09-23T09:15:00Z',
        replies: [],
      },
      {
        id: 104,
        topicId: 2,
        author: 'Frank',
        body: 'Для часто используемых полей подойдут btree индексы.',
        ownerId: 'user-987',
        createdAt: '2025-09-23T09:45:00Z',
        updatedAt: '2025-09-23T09:45:00Z',
        replies: [
          {
            id: 1002,
            commentId: 104,
            author: 'George',
            body: 'А для full-text поиска лучше gin/gist.',
            ownerId: 'user-741',
            createdAt: '2025-09-23T10:00:00Z',
            updatedAt: '2025-09-23T10:00:00Z',
            reactions: [
              {
                id: 5002,
                replyId: 1002,
                type: 'laugh',
                ownerId: 'user-654',
                createdAt: '2025-09-23T10:05:00Z',
                updatedAt: '2025-09-23T10:05:00Z',
              },
            ],
          },
        ],
      },
    ],
  },
]

export const ForumIndex = () => {
  const useMock = import.meta.env.VITE_USE_FORUM_MOCK
  const {
    data: apiTopics,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetApiV1ForumTopicsQuery(undefined, { skip: useMock })

  const loading = !useMock && (isLoading || isFetching)
  const topics: Array<Topic> | undefined = useMock ? topicsMock : apiTopics
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
          refetch={refetch}
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
