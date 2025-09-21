import express from 'express'

import themeRouter from './theme'
import userRouter from './user'
import topicsRouter from './topics'
import commentsRouter from './comments'
import authRouter from './auth'

const router = express.Router()

router.use('/forum/topics', topicsRouter)
router.use('/forum/comments', commentsRouter)
router.use('/auth', authRouter)
router.use('/themes', themeRouter)
router.use('/users', userRouter)

export default router
