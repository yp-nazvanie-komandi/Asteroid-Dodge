import type { Topic } from '../../../redux/api/Forum/generated/types'

export type TForumTopicProps = Topic

export type TPosts = {
  text: string
  avatar?: string
}
