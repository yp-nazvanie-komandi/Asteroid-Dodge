import { TCircleAvatar } from './types'
import { Avatar } from '@mui/material'
import { stringAvatar } from './utils'

export const CircleAvatar = ({ url, name }: TCircleAvatar) => {
  return url ? (
    <Avatar alt={name} src={url} sx={{ width: 40, height: 40 }} />
  ) : (
    <Avatar alt={name} {...stringAvatar(name)} sx={{ width: 40, height: 40 }} />
  )
}
