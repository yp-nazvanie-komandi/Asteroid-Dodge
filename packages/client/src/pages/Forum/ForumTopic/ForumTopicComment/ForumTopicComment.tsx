import { FC } from 'react'
import { TForumTopicCommentProps } from './types'
import { Paper } from '@mui/material'
import { CircleAvatar } from '../../../../components/CircleAvatar/CircleAvatar'
import './style.scss'

export const ForumTopicComment: FC<TForumTopicCommentProps> = ({
  avatar,
  userName,
  text,
}) => {
  return (
    <Paper elevation={5} className="forum-topic__comment">
      <div className="avatar-container">
        <CircleAvatar name={userName} url={avatar} />
      </div>
      <div className="comment-container">
        <p className="forum-topic-comment__text">{text}</p>
      </div>
    </Paper>
  )
}
