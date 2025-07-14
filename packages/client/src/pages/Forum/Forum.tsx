import { FC } from 'react'
import './style.scss'
import { TopicsMock } from './mock'
import { ForumTopicPreview } from '../ForumTopic/ForumTopicPreview/ForumTopicPreview'
import { ForumContainer } from '../../components/ForumContainer/ForumContainer'

export const Forum: FC = () => {
  return (
    <ForumContainer>
      <div className="forum-container">
        <h2 className="forum-container__title">Forum</h2>
        <p>тут будет кнопка после слива МР с кнопкой</p>
        <section className="forum-container__topics">
          {TopicsMock.map((topic, index) => (
            <ForumTopicPreview
              title={topic.title}
              text={topic.text}
              avatar={topic.avatar}
              userName={topic.userName}
              key={topic.userName + index}
            />
          ))}
        </section>
      </div>
    </ForumContainer>
  )
}
