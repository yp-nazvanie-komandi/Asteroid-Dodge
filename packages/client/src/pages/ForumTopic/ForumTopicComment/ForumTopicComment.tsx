import { TForumTopicCommentProps } from './types'
import { Avatar, Paper } from '@mui/material'
import './style.scss'
import { stringAvatar } from '../../../components/ForumTopicTitles/utils'

export const ForumTopicComment = ({
  author,
  text,
}: TForumTopicCommentProps) => {
  return (
    <Paper elevation={5} className="forum-topic__comment">
      <div className="avatar-container">
        <Avatar>{stringAvatar(author)}</Avatar>
      </div>
      <div className="comment-container">
        <p className="forum-topic-comment__text">{text}</p>
      </div>
    </Paper>
  )
}
