import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'
import forumRouter from './api/v1/router'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

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

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
  })
)

// Handle preflight requests
app.options('*', cors())

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

createClientAndConnect()

app.get('/', (_, res) => {
  res.json('👋 Server of Asteroid-Dodge')
})

app.use('/api/v1/forum', forumRouter)

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Forum API',
      version: '1.0.0',
      description:
        'Forum API with JWT authentication. Use /auth/login to get a token. author and ownerId automatically come from JWT token. author defaults to "NoBody" if not provided. Only uid and name required.',
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
  },
  apis: ['./api/v1/*.ts', './forum/crud/*.ts'],
})

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Forum API - JWT Authentication (Simplified)',
  })
)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
