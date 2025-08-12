import { Navigate, Outlet, useLocation } from 'react-router'

import { Container, CircularProgress } from '@mui/material'

import { useAuth } from '../../hooks/Auth/useAuth'
import Cookies from 'js-cookie'

import './style.scss'
import { useHashParams } from '../../hooks/Auth/useOAuth'

export const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth()

  const { access_token, token_type } = useHashParams()

  const isAuth = !!Cookies.get('auth_token')

  const location = useLocation()

  if (isLoading) {
    return (
      <Container fixed className="router-loader">
        <CircularProgress />
      </Container>
    )
  }

  if (!isAuthenticated && !isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
