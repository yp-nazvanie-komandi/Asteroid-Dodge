import { Navigate, Outlet } from 'react-router'

import { Container, CircularProgress } from '@mui/material'

import { useAuth } from '../../hooks/Auth/useAuth'

import './style.scss'

export const PrivateRoutes = () => {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Container fixed className="router-loader">
        <CircularProgress />
      </Container>
    )
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
