import { GameModel } from './model'

export class GameView {
  constructor(
    private model: GameModel,
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement
  ) {}

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Игрок
    this.model.player.draw(this.ctx)

    // Пули
    this.model.bullets.forEach(bullet => bullet.draw(this.ctx))

    // Противники
    this.model.enemies.forEach(enemy => enemy.draw(this.ctx))
  }
}
