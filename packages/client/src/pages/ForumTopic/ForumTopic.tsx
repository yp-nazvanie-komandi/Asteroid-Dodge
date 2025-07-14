import { FC } from 'react'
import { Paper } from '@mui/material'
import { forumTopicCommentMock, forumTopicMock } from './mock'
import { ForumTopicComment } from './ForumTopicComment/ForumTopicComment'
import './style.scss'
import { TopicTitles } from '../../components/ForumTopicTitles/TopicTitles'

export const ForumTopic: FC = () => {
  /// тут будет useParams для получения всего что нужно по айди
  return (
    <Paper elevation={5}>
      <TopicTitles
        title={forumTopicMock.title}
        text={forumTopicMock.text}
        avatar={forumTopicMock.avatar}
        userName={forumTopicMock.userName}
      />
      <div className="forum-topic-comments">
        {forumTopicCommentMock.map((comment, index) => (
          <ForumTopicComment
            avatar={comment.avatar}
            userName={comment.userName}
            text={comment.text}
            key={comment.userName + index}
          />
        ))}
      </div>
    </Paper>
  )
}
