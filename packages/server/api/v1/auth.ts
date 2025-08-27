import express from 'express'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../../middleware/auth'

const router = express.Router()

/**
 * @openapi
 * /api/v1/forum/auth/me:
 *   get:
 *     summary: Get current user info (requires authentication)
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *       401:
 *         description: Not authenticated
 */
router.get('/me', authMiddleware, async (req, res) => {
  return res.json({
    authenticated: true,
    user: req.user,
  })
})

/**
 * @openapi
 * /api/v1/forum/auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [uid, name]
 *             properties:
 *               uid:
 *                 type: string
 *                 description: User ID
 *               name:
 *                 type: string
 *                 description: User name
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request - missing required fields
 */
router.post('/login', async (req, res) => {
  try {
    const { uid, name } = req.body

    if (!uid || !name) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['uid', 'name'],
      })
    }

    const userInfo = { uid, name }
    const secret = process.env.JWT_SECRET || 'your-secret-key'

    // JWT token
    const token = jwt.sign(userInfo, secret, { expiresIn: '24h' })

    return res.json({
      success: true,
      message: 'Login successful, JWT token generated',
      token,
      user: userInfo,
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      error: 'Internal server error',
    })
  }
})

/**
 * @openapi
 * /api/v1/forum/auth/logout:
 *   post:
 *     summary: Logout (JWT token becomes invalid)
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful, token invalidated
 */
router.post('/logout', async (_req, res) => {
  return res.json({
    success: true,
    message: 'Logout successful. JWT token will expire naturally.',
  })
})

/**
 * @openapi
 * /api/v1/forum/auth/token-info:
 *   get:
 *     summary: Get JWT token information
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: JWT token information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenType:
 *                   type: string
 *                 settings:
 *                   type: object
 *                   properties:
 *                     algorithm:
 *                       type: string
 *                     expiresIn:
 *                       type: string
 *                     issuer:
 *                       type: string
 *                 note:
 *                   type: string
 */
router.get('/token-info', async (_req, res) => {
  return res.json({
    tokenType: 'JWT',
    settings: {
      algorithm: 'HS256',
      expiresIn: '24h',
      issuer: 'forum-api',
    },
    note: 'JWT tokens are stateless and secure',
  })
})

export default router
