import { Topic, Comment, Reply, Reaction } from '../models'

export const createTopic = async (
  title: string,
  body: string,
  author: string,
  ownerId: string
) => {
  return await Topic.create({ title, body, author, ownerId })
}

export const getAllTopics = async () => {
  return await Topic.findAll({
    include: [
      {
        model: Comment,
        as: 'comments',
        include: [
          {
            model: Reply,
            as: 'replies',
            include: [
              {
                model: Reaction,
                as: 'reactions',
              },
            ],
          },
        ],
      },
    ],
  })
}

export const getTopicById = async (id: number) => {
  return await Topic.findByPk(id, {
    include: [
      {
        model: Comment,
        as: 'comments',
        include: [
          {
            model: Reply,
            as: 'replies',
            include: [
              {
                model: Reaction,
                as: 'reactions',
              },
            ],
          },
        ],
      },
    ],
  })
}
