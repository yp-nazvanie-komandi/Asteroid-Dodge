import { GameModel } from './model.js'
import { GameView } from './view.js'
import Settings from '../settings.js'
import { GameController } from './controller.js'
import { ResourceVisual } from '../types.js'

export class GameEngine {
  controller: GameController
  model: GameModel
  view: GameView
  eventHandlersRemove: () => void

  // Колбэки для обновления состояния
  private setScore?: (score: number) => void
  private setPlayerLose?: (lose: boolean) => void

  constructor(
    settings: Settings,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    resources: ResourceVisual,
    callbacks?: {
      setScore?: (score: number) => void
      setPlayerLose?: (lose: boolean) => void
    }
  ) {
    const model = new GameModel(settings, resources)
    this.model = model
    const view = new GameView(model, ctx, canvas)
    this.view = view
    const controller = new GameController(model, settings)
    this.controller = controller
    this.eventHandlersRemove = this.model.initControls()
    // Колбека для обновления состояния родительского компонента
    this.setScore = callbacks?.setScore
    this.setPlayerLose = callbacks?.setPlayerLose
  }

  start() {
    const loop = (timestamp: number) => {
      this.controller.spawnIfNeeded(timestamp)
      const dt = (performance.now() - this.model.lastFrameTime) / 1000.0

      const playerIsLose = this.controller.update(dt)

      this.view.draw()

      // Обновляем состояние React
      if (this.setScore) this.setScore(this.model.score)
      if (playerIsLose && this.setPlayerLose) this.setPlayerLose(true)

      this.model.lastFrameTime = performance.now()

      if (playerIsLose) {
        this.controller.stop()
        return
      }

      this.model.animationId = requestAnimationFrame(loop)
    }

    this.model.animationId = requestAnimationFrame(loop)
  }

  stop() {
    this.controller.stop()
    this.eventHandlersRemove()
  }
}
