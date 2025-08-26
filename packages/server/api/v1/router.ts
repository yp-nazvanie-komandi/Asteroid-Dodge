import express from 'express'
import { createSequelize, initModels } from '../../forum/models'
import topicsRouter from './topics'
import commentsRouter from './comments'
import authRouter from './auth'

const router = express.Router()

// Initialize database and models
const sequelize = createSequelize()
initModels(sequelize)

// Sync database (in development)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synced')
  })
  .catch(err => {
    console.error('Database sync error:', err)
  })

// Mount routers
router.use('/topics', topicsRouter)
router.use('/comments', commentsRouter)
router.use('/auth', authRouter)

export default router
