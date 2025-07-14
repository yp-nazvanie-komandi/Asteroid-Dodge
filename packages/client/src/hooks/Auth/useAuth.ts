import { useEffect, useState } from 'react'

import { Auth } from '../../services/Auth/Auth'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const authenticate = async () => {
      try {
        const { successful } = await Auth.getInstance().authenticate()

        setIsAuthenticated(successful)
      } finally {
        setLoading(false)
      }
    }

    authenticate()
  }, [])

  return { isAuthenticated, isLoading }
}
