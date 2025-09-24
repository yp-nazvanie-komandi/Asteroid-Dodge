import { Avatar, Typography } from '@mui/material'
import { TTopicTitlesProps } from './types'
import './styled.scss'
import { stringAvatar } from './utils'
import { useNavigate } from 'react-router'

export const TopicTitles = ({
  id,
  title,
  author,
  text,
  hasRedirect = true,
}: TTopicTitlesProps) => {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="forum-topic__titles"
        onClick={() => hasRedirect && navigate(`:${id}`)}
      >
        <Typography variant="h6" className="forum-topic__title">
          {title}
        </Typography>
        <Avatar>{stringAvatar(author)}</Avatar>
      </div>
      <div className="forum-topic__text">
        <Typography variant="h6" className="forum-topic__title">
          {text}
        </Typography>
      </div>
    </>
  )
}
