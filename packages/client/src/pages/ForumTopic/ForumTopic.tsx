import { Paper } from '@mui/material'
import { forumTopicCommentMock, forumTopicMock } from './mock'
import { ForumTopicComment } from './ForumTopicComment/ForumTopicComment'
import './style.scss'
import { TopicTitles } from '../../components/ForumTopicTitles/TopicTitles'
import { ForumContainer } from '../../components/ForumContainer/ForumContainer'

export const ForumTopic = () => {
  /// тут будет useParams для получения всего что нужно по айди
  return (
    <ForumContainer>
      <Paper className="forum-topic-container" elevation={5}>
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
    </ForumContainer>
  )
}
