import { Typography } from '@mui/material'
import { TTopicTitlesProps } from './types'
import './styled.scss'
import { CircleAvatar } from '../CircleAvatar/CircleAvatar'

export const TopicTitles = ({
  title,
  userName,
  avatar,
  text,
}: TTopicTitlesProps) => {
  return (
    <>
      <div className="forum-topic__titles">
        <Typography variant="h6" className="forum-topic__title">
          {title}
        </Typography>
        <CircleAvatar name={userName} url={avatar} />
      </div>
      <div className="forum-topic__text">
        <Typography variant="h6" className="forum-topic__title">
          {text}
        </Typography>
      </div>
    </>
  )
}
