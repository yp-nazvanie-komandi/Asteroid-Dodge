import express from 'express'
import {
  createReply,
  createReaction,
  getCommentById,
  getReplyById,
} from '../../forum/crud/comments'
import { jwtAuthMiddleware } from '../../middleware/auth'

const router = express.Router()

/**
 * @openapi
 * /api/v1/forum/comments/{id}/replies:
 *   post:
 *     summary: Add reply to comment
 *     tags:
 *       - Comments
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
 *         description: Reply created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.post('/:id/replies', jwtAuthMiddleware, async (req, res) => {
  const { body } = req.body
  if (!body) return res.status(400).json({ error: 'body is required' })

  const comment = await getCommentById(Number(req.params.id))
  if (!comment) return res.sendStatus(404)

  if (!req.jwtUser?.name) {
    return res.status(400).json({ error: 'User name is required in JWT token' })
  }
  const author = req.jwtUser.name
  const ownerId = req.jwtUser.uid

  const reply = await createReply(comment.id, author, body, ownerId)
  return res.status(201).json(reply)
})

/**
 * @openapi
 * /api/v1/forum/replies/{id}/reactions:
 *   post:
 *     summary: Add reaction to reply
 *     tags:
 *       - Comments
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
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [like, dislike, laugh, sad, angry]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Reaction created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reply not found
 */
router.post('/replies/:id/reactions', jwtAuthMiddleware, async (req, res) => {
  const { type } = req.body
  if (!type) return res.status(400).json({ error: 'type is required' })

  const reply = await getReplyById(Number(req.params.id))
  if (!reply) return res.sendStatus(404)

  if (!req.jwtUser?.uid) {
    return res.status(400).json({ error: 'User UID is required in JWT token' })
  }
  const ownerId = req.jwtUser.uid

  const reaction = await createReaction(reply.id, type, ownerId)
  return res.status(201).json(reaction)
})

export default router
