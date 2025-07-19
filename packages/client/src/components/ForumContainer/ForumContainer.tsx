import { TForumContainerProps } from './types'
import './style.scss'

export const ForumContainer = ({ children }: TForumContainerProps) => {
  return (
    <div className="forum-wrapper">
      <div className="forum-content-wrapper">{children}</div>
    </div>
  )
}
