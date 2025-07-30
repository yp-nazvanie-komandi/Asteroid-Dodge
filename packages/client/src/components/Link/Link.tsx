import type { ReactNode } from 'react'

import './style.scss'

interface ILinkProps {
  children: ReactNode
  onClick: () => void
}

export const Link = ({ children, onClick }: ILinkProps) => {
  return (
    <div onClick={onClick} className={'link'}>
      {children}
    </div>
  )
}
