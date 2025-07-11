import { useCallback, useEffect } from 'react'
import { SimpleBox } from '../entities/base'
import { BasicColors } from '../utils/colors'
import Settings from '../settings'
import { GameEntitiesState } from '../types'

const settings = new Settings()

export function usePlayerControls(gameEntitiesState: GameEntitiesState) {
  // Cтабильные обработчики с useCallback
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      gameEntitiesState.keys[e.key] = true
      if (e.key === ' ') {
        gameEntitiesState.bullets.push(
          new SimpleBox(
            {
              x:
                gameEntitiesState.player.x +
                gameEntitiesState.player.width / 2 -
                settings.BULLET_WIDTH / 2,
              y: gameEntitiesState.player.y,
              width: settings.BULLET_WIDTH,
              height: settings.BULLET_HEIGHT,
            },
            BasicColors.YELLOW
          )
        )
      }
    },
    [gameEntitiesState]
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      gameEntitiesState.keys[e.key] = false
    },
    [gameEntitiesState]
  )

  // Подписываемся и отписываемся в useEffect
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])
}
