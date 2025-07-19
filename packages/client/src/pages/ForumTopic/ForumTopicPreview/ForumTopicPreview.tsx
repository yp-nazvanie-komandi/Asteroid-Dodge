import { TForumTopicProps } from './types'
import { TopicTextAreaInput } from './TopicTextAreaInput/TopicTextAreaInput'
import { Paper } from '@mui/material'
import { TopicTitles } from '../../../components/ForumTopicTitles/TopicTitles'

export const ForumTopicPreview = ({
  avatar,
  title,
  text,
  userName,
}: TForumTopicProps) => {
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
