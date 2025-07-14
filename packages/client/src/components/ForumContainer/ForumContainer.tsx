import { FC } from 'react'
import { TForumContainerProps } from './types'
import './style.scss'

export const ForumContainer: FC<TForumContainerProps> = ({ children }) => {
  return (
    <div className="forum-wrapper">
      <div className="forum-content-wrapper">{children}</div>
    </div>
  )
}
