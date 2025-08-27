import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Расширенный Request интерфейс
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      uid: string
      name?: string
    }
  }
}

export interface UserInfo {
  uid: string
  name?: string
}

export interface JWTPayload {
  uid: string
  name?: string
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Access denied. No valid authorization header provided.',
        message: 'User must be authenticated via JWT',
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key'
      const decoded = jwt.verify(token, secret) as JWTPayload

      if (!decoded.uid) {
        return res.status(401).json({
          error: 'Invalid JWT token: missing user ID',
          required: ['uid'],
        })
      }

      req.user = {
        uid: decoded.uid,
        name: decoded.name,
      }

      next()
      return
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError)
      return res.status(401).json({
        error: 'Invalid JWT token',
        message: 'Token is expired or malformed',
      })
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Возможно некоторые маршруты будут работать без требования авторизации
export const optionalAuthMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7)
        const secret = process.env.JWT_SECRET || 'your-secret-key'
        const decoded = jwt.verify(token, secret) as JWTPayload

        if (decoded.uid) {
          req.user = {
            uid: decoded.uid,
            name: decoded.name,
          }
        }
      } catch (jwtError) {
        console.warn('Invalid JWT in optional auth:', jwtError)
      }
    }

    next()
    return
  } catch (error) {
    console.error('Optional auth middleware error:', error)
    next()
    return
  }
}
