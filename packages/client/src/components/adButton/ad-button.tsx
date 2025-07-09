import Button from '@mui/material/Button'
import './style.scss'

interface AdButtonProps {
  variant?: 'text' | 'outlined' | 'contained'
  text?: string
}

export default function AdButton({
  variant = 'contained',
  text = '',
}: AdButtonProps) {
  return (
    <Button className="adButton" variant={variant}>
      {text}
    </Button>
  )
}
