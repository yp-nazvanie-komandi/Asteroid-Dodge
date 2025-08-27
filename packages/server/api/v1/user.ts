import express from 'express'

import { attachThemeToUser, getThemeByUserId } from '../../theme/crud/user'

import { ypAuthMiddleware } from '../../middleware/auth'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const router = express.Router()

/**
 * @openapi
 * /api/v1/users/theme/:
 *   get:
 *     summary: Get user theme
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Theme attached to user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttachedThemeResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *       404:
 *         description: User or theme not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *
 * components:
 *   schemas:
 *     HttpErrorBody:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       required:
 *         - error
 *
 *     AttachedThemeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the theme attached to the user
 *         name:
 *           type: string
 *           description: Name of the theme attached to the user
 *       required:
 *         - id
 *         - name
 */
router.get('/theme', ypAuthMiddleware, async (req, res) => {
  try {
    const userId = req.ypUser?.id

    if (!userId) {
      return res
        .status(401)
        .json({ error: 'User must be authenticated to get theme' })
    }

    const userTheme = await getThemeByUserId(userId)

    if (!userTheme) {
      return res.status(404).json({ error: 'User or theme not found' })
    }

    res.cookie('theme', userTheme.name, { maxAge: ONE_YEAR }) // 1 год

    return res.status(200).json(userTheme)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @openapi
 * /api/v1/users/theme/:
 *   post:
 *     summary: Attach theme to user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttachThemeRequest'
 *     responses:
 *       200:
 *         description: Theme attached to user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttachThemeResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *       404:
 *         description: User or theme not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorBody'
 *
 * components:
 *   schemas:
 *     HttpErrorBody:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       required:
 *         - error
 *
 *     AttachThemeRequest:
 *       type: object
 *       properties:
 *         themeName:
 *           type: string
 *           description: Name of the theme to attach to the user
 *       required:
 *         - themeName
 *
 *     AttachThemeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the theme attached to the user
 *         name:
 *           type: string
 *           description: Name of the theme attached to the user
 *       required:
 *         - id
 *         - name
 */
router.post('/theme', ypAuthMiddleware, async (req, res) => {
  try {
    const { themeName } = req.body

    if (!themeName) {
      return res.status(400).json({ error: 'themeName is required' })
    }

    const userId = req.ypUser?.id

    if (!userId) {
      return res
        .status(401)
        .json({ error: 'User must be authenticated to attach theme' })
    }

    const attachedTheme = await attachThemeToUser(userId, themeName)

    if (!attachedTheme) {
      return res.status(404).json({ error: 'Theme or user not found' })
    }

    res.cookie('theme', attachedTheme.name, {
      maxAge: ONE_YEAR,
    }) // 1 год

    return res.status(200).json(attachedTheme)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
