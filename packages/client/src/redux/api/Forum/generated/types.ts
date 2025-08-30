/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// ВНИМАНИЕ! Этот файл был сгенерирован автоматически. Изменения могут быть перезаписаны. НЕ редактируйте его вручную!
export type GetApiV1ForumTopicsApiResponse =
  /** status 200 Список тем (каждая с комментариями/ответами/реакциями) */ Topic[]
export type GetApiV1ForumTopicsApiArg = void
export type PostApiV1ForumTopicsApiResponse =
  /** status 201 Тема создана */ Topic
export type PostApiV1ForumTopicsApiArg = {
  /** Данные для создания темы */
  createTopicRequest: CreateTopicRequest
}
export type GetApiV1ForumTopicsByIdApiResponse =
  /** status 200 Тема найдена */ Topic
export type GetApiV1ForumTopicsByIdApiArg = {
  /** ID темы */
  id: number
}
export type PostApiV1ForumTopicsByIdCommentsApiResponse =
  /** status 201 Комментарий создан */ Comment
export type PostApiV1ForumTopicsByIdCommentsApiArg = {
  /** ID темы */
  id: number
  /** Данные комментария */
  createCommentRequest: CreateCommentRequest
}
export type Reaction = {
  id: number
  replyId: number
  type: 'like' | 'dislike' | 'laugh' | 'sad' | 'angry'
  ownerId: string
  createdAt: string
  updatedAt: string
}
export type Reply = {
  id: number
  commentId: number
  author: string
  body: string
  ownerId: string
  createdAt: string
  updatedAt: string
  reactions?: Reaction[]
}
export type Comment = {
  id: number
  topicId: number
  author: string
  body: string
  ownerId: string
  createdAt: string
  updatedAt: string
  replies?: Reply[]
}
export type Topic = {
  id: number
  title: string
  body: string
  author: string
  ownerId: string
  createdAt: string
  updatedAt: string
  comments?: Comment[]
}
export type HttpErrorBody = {
  /** Сообщение об ошибке */
  error: string
}
export type CreateTopicRequest = {
  /** Заголовок темы */
  title: string
  /** Содержимое темы */
  body: string
}
export type CreateCommentRequest = {
  /** Текст комментария */
  body: string
}
