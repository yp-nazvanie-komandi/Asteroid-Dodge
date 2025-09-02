import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { styled } from '@mui/material'

export const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const FullscreenButton = styled(Button)({
    // Полностью переопределяем стили
    all: 'unset',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 2000,
    padding: '8px 16px',
    height: 'auto',
    width: 'auto',
    minWidth: 'auto',

    '&.fullscreen-mode': {
      backgroundColor: '#ff4444',
    },

    '&:not(.fullscreen-mode)': {
      backgroundColor: '#4CAF50',
    },

    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  })

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error)
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <FullscreenButton
      onClick={toggleFullscreen}
      text={isFullscreen ? 'Выйти из Fullscreen' : 'Fullscreen'}
      className={isFullscreen ? 'fullscreen-mode' : ''}
    ></FullscreenButton>
  )
}
