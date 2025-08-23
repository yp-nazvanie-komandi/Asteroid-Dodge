import { Outlet, useLocation } from 'react-router'

import { Container, CircularProgress } from '@mui/material'

import { Navigate } from '../Navigate/Navigate'

import { useAuth } from '../../hooks/Auth/useAuth'

import './style.scss'

export const PrivateRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth()

  const location = useLocation()

  if (isLoading) {
    return (
      <Container fixed className="router-loader">
        <CircularProgress />
      </Container>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
