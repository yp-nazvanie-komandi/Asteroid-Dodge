import express from 'express'
import {
  createTopic,
  getAllTopics,
  getTopicById,
} from '../../forum/crud/topics'
import { createComment } from '../../forum/crud/comments'
import { authMiddleware, optionalAuthMiddleware } from '../../middleware/auth'

const router = express.Router()

/**
 * @openapi
 * /api/v1/forum/topics:
 *   get:
 *     summary: Get all topics with nested comments, replies, reactions
 *     tags:
 *       - Topics
 *     responses:
 *       200:
 *         description: List of topics
 */
router.get('/', optionalAuthMiddleware, async (_, res) => {
  const topics = await getAllTopics()
  return res.json(topics)
})

/**
 * @openapi
 * /api/v1/forum/topics:
 *   post:
 *     summary: Create topic
 *     tags:
 *       - Topics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, body]
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Topic created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, async (req, res) => {
  const { title, body } = req.body
  if (!title || !body)
    return res.status(400).json({ error: 'title and body are required' })

  // Имя автора извлекаем из JWT токена
  if (!req.user?.name) {
    return res.status(400).json({ error: 'User name is required in JWT token' })
  }
  const author = req.user.name
  const ownerId = req.user.uid

  const topic = await createTopic(title, body, author, ownerId)
  return res.status(201).json(topic)
})

/**
 * @openapi
 * /api/v1/forum/topics/{id}:
 *   get:
 *     summary: Get single topic by id
 *     tags:
 *       - Topics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Topic
 *       404:
 *         description: Not found
 */
router.get('/:id', optionalAuthMiddleware, async (req, res) => {
  const topic = await getTopicById(Number(req.params.id))
  if (!topic) return res.sendStatus(404)
  return res.json(topic)
})

/**
 * @openapi
 * /api/v1/forum/topics/{id}/comments:
 *   post:
 *     summary: Add comment to topic
 *     tags:
 *       - Topics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [body]
 *             properties:
 *               body:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Topic not found
 */
router.post('/:id/comments', authMiddleware, async (req, res) => {
  const { body } = req.body
  if (!body) return res.status(400).json({ error: 'body is required' })

  const topic = await getTopicById(Number(req.params.id))
  if (!topic) return res.sendStatus(404)

  // Имя автора извлекаем из JWT токена
  if (!req.user?.name) {
    return res.status(400).json({ error: 'User name is required in JWT token' })
  }
  const author = req.user.name
  const ownerId = req.user.uid

  const comment = await createComment(topic.id, author, body, ownerId)
  return res.status(201).json(comment)
})

export default router
