import { useGetAuthUserQuery } from '../../redux/api/Auth/auth'

export const useAuth = () => {
  const { isLoading, error } = useGetAuthUserQuery()

  return { isLoading, isAuthenticated: !error }
}
