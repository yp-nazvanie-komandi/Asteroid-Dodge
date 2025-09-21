import { Avatar, Typography } from '@mui/material'
import { TTopicTitlesProps } from './types'
import './styled.scss'
import { stringAvatar } from './utils'

export const TopicTitles = ({ title, author, text }: TTopicTitlesProps) => {
  return (
    <>
      <div className="forum-topic__titles">
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
