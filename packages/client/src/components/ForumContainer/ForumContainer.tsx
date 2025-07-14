import { FC } from 'react'
import { TForumContainerProps } from './types'
import './style.scss'

export const ForumContainer: FC<TForumContainerProps> = ({ children }) => {
  return <div className="forum-container">{children}</div>
}
