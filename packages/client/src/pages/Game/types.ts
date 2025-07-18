import { SimpleBox } from './entities/base'

export interface GameEntitiesState {
  player: SimpleBox
  bullets: SimpleBox[]
  enemies: SimpleBox[]
  keys: Record<string, boolean>
  lastFrameTime: number
  animationId: number
}
