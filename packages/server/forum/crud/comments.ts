import { Comment, Reply, Reaction } from '../models'

export const createComment = async (
  topicId: number,
  author: string,
  body: string,
  ownerId: string
) => {
  return await Comment.create({ topicId, author, body, ownerId })
}

export const createReply = async (
  commentId: number,
  author: string,
  body: string,
  ownerId: string
) => {
  return await Reply.create({ commentId, author, body, ownerId })
}

export const createReaction = async (
  replyId: number,
  type: 'like' | 'dislike' | 'laugh' | 'sad' | 'angry',
  ownerId: string
) => {
  return await Reaction.create({ replyId, type, ownerId })
}

export const getCommentById = async (id: number) => {
  return await Comment.findByPk(id)
}

export const getReplyById = async (id: number) => {
  return await Reply.findByPk(id)
}
