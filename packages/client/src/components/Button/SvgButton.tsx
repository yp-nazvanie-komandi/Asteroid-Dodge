// SvgButton.tsx
import React from 'react'
import Button, { IButtonPropsExtended } from './Button'

interface ISvgButtonProps extends IButtonPropsExtended {
  svg?: React.ReactNode
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
