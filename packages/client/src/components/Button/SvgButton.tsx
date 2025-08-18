// SvgButton.tsx
import { ReactNode } from 'react'
import Button, { IButtonPropsExtended } from './Button'

interface ISvgButtonProps extends IButtonPropsExtended {
  svg?: ReactNode
}

export default function SvgButton({ svg, text, ...rest }: ISvgButtonProps) {
  return (
    <Button
      {...rest}
      text={
        <>
          {svg}
          {text}
        </>
      }
    />
  )
}
