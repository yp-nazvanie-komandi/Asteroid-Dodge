import Settings from './settings'
import { useRef } from 'react'
import { BasicColors } from './utils/colors'
import { Rectangle } from './utils/geometry'
import { SimpleBox } from './entities/base'
import { GameEntitiesState } from './types'

const settings = new Settings()

export function makeGameEntiriesState(): GameEntitiesState {
  const player = new SimpleBox(
    {
      x: settings.CANVAS_WIDTH / 2 - settings.PLAYER_WIDTH / 2,
      y: settings.CANVAS_HEIGHT - settings.PLAYER_HEIGHT - 10,
      width: settings.PLAYER_WIDTH,
      height: settings.PLAYER_HEIGHT,
    } as Rectangle,
    BasicColors.WHITE
  )
  const bullets: SimpleBox[] = []
  const enemies: SimpleBox[] = []
  const keys: Record<string, boolean> = {}

  const gameEntietiesState = useRef({
    player: player,
    bullets: bullets,
    enemies: enemies,
    keys: keys,
    lastFrameTime: 0,
    animationId: -1,
  }).current

  return gameEntietiesState
}
