import { useGetAuthUserQuery } from '../../redux/api/Auth/enhanced/api'

export const useAuth = () => {
  const { data, isLoading, isFetching, error } = useGetAuthUserQuery()

  return {
    isLoading: isFetching || isLoading,
    isAuthenticated: Boolean(data) && !error,
  }
}
