import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

interface IHashParams {
  access_token: string | null
  token_type: string | null
  expires_in: string | null
  cid: string | null
  [key: string]: string | null
}

export const useHashParams = (): IHashParams => {
  const location = useLocation()

  const [params, setParams] = useState<IHashParams>({
    access_token: null,
    token_type: null,
    expires_in: null,
    cid: null,
  })

  useEffect(() => {
    const hash = location.hash.substring(1)
    const searchParams = new URLSearchParams(hash)

    setParams({
      access_token: searchParams.get('access_token'),
      token_type: searchParams.get('token_type'),
      expires_in: searchParams.get('expires_in'),
      cid: searchParams.get('cid'),
    })
  }, [location])

  return params
}
