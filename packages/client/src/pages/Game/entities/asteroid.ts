import { Rectangle } from '../types.js'
import { Entity } from './base.js'
import { Drawable, Updateable } from './types.js'

export class Asteroid extends Entity implements Drawable, Updateable {
  visual: HTMLImageElement

  private rotationAngle = 0 // Текущий угол в радианах
  private rotationSpeed = 5 // Скорость вращения (рад/кадр)

  constructor(rect: Rectangle, visual: HTMLImageElement) {
    super(rect)
    this.visual = visual
  }

  update(dt: number) {
    this.rotationAngle += this.rotationSpeed * (dt / 16.67)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save() // Сохраняем текущее состояние

    // Перемещаем точку вращения в центр изображения
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2)

    // Поворачиваем контекст
    ctx.rotate(this.rotationAngle)

    //Рисуем изображение с учетом смещения (координаты теперь относительно центра)
    ctx.drawImage(
      this.visual,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )

    ctx.restore() // Восстанавливаем состояние
  }
}
