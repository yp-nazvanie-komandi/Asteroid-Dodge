import express from 'express'
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import apiRouter from './api/v1/router'

import { initThemeModels } from './theme/models'
import { initForumModels } from './forum/models'

dotenv.config()
//
;(async () => {
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
    process.env

  const sequelize = new Sequelize(
    POSTGRES_DB || '',
    POSTGRES_USER || '',
    POSTGRES_PASSWORD || '',
    {
      host: 'localhost',
      port: Number(POSTGRES_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
    },
  )

  initThemeModels(sequelize)
  initForumModels(sequelize)

  await sequelize.sync({ alter: true })

  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001

  // CORS configuration
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
      ]

  const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AsteroidDodge API',
        version: '1.0.0',
        description:
          'AsteroidDodge API documentation, [Forum API with JWT authentication. Use /auth/login to get a token. author and ownerId automatically come from JWT token. author defaults to "NoBody" if not provided. Only uid and name required.]',
      },
      servers: [{ url: `http://localhost:${port}` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description:
              'JWT token for authentication. Use /auth/login to get a token.',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      externalDocs: {
        description: '[Download this swagger spec]',
        url: `/swagger.json`,
      },
    },
    apis: ['./api/v1/*.ts', './theme/crud/*.ts', './forum/crud/*.ts'],
  })

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['Set-Cookie'],
    }),
  )

  // Handle preflight requests
  app.options('*', cors())

  app.use(express.json())
  // @ts-expect-error fix-cookie-parser
  app.use(cookieParser())
  app.use(express.static('public'))

  app.use('/api/v1/', apiRouter)

  app.use(
    '/api-docs',
    /* @ts-expect-error fix-swagger */
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true,
        tryItOutEnabled: true,
      },
    }),
  )

  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="swagger.json"')
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    console.log(
      `  ➜ 📚 API documentation is available at: http://localhost:${port}/api-docs`,
    )
  })
})()
//
