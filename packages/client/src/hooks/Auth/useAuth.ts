/// убрал все что связано со стейтами т.к. хранить и получать юзера мы будем на верхнем уровне, а хранить в сторе или контексте.

export function useAuth() {
  const user = useSelector((state: RootState) => state.auth.user)
  const loading = useSelector((state: RootState) => state.auth.loading)
  return { user, isAuth: !!user, isLoading: loading }
}
