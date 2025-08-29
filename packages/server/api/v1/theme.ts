import express from 'express'

import { getAllThemes, getThemesByName } from '../../theme/crud/theme'

const router = express.Router()

/**
 * @openapi
 * /api/v1/themes:
 *   get:
 *     summary: Get all themes
 *     tags:
 *       - Themes
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Name of the theme to filter by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of themes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ThemeResponse'
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
 *     ThemeResponse:
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
router.get('/', async (req, res) => {
  try {
    const { name } = req.query

    if (name) {
      const themes = await getThemesByName(String(name))

      return res.json(themes)
    }

    const themes = await getAllThemes()

    return res.json(themes)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
