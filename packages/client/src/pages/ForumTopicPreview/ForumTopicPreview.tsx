import { FC } from 'react'
import { TForumTopicProps } from './types'
import { TopicTextAreaInput } from './TopicTextAreaInput/TopicTextAreaInput'
import { Paper } from '@mui/material'
import { TopicTitles } from '../../components/ForumTopicTitles/TopicTitles'

export const ForumTopicPreview: FC<TForumTopicProps> = ({
  avatar,
  title,
  text,
  userName,
}) => {
  const onSubmit = (form: unknown) => {
    console.log(form)
  }
  return (
    <Paper elevation={5}>
      <TopicTitles
        title={title}
        text={text}
        avatar={avatar}
        userName={userName}
      />
      <div className="forum-topic__descriptions">
        <TopicTextAreaInput submitCallback={onSubmit} />
      </div>
    </Paper>
  )
}
