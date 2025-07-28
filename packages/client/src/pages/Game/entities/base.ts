import { Rectangle } from '../types'
import { BasicColors } from '../utils/colors'
import { isRectanglesIntersect } from '../utils/geometry'
import { Drawable } from './types'

export class Entity {
  rect: Rectangle

  constructor(rect: Rectangle) {
    this.rect = rect
  }

  move(x: number, y: number) {
    this.rect.x = x
    this.rect.y = y
  }

  collision(another: Entity): boolean {
    return isRectanglesIntersect(this.rect, another.rect)
  }

  // Геттеры и сеттеры для позиции
  get x(): number {
    return this.rect.x
  }

  set x(value: number) {
    this.rect.x = value
  }

  get y(): number {
    return this.rect.y
  }

  set y(value: number) {
    this.rect.y = value
  }

  // Геттеры для габаритов
  get width(): number {
    return this.rect.width
  }

  get height(): number {
    return this.rect.height
  }
}

export class SimpleBox extends Entity implements Drawable {
  color: BasicColors

  constructor(rect: Rectangle, color: BasicColors) {
    super(rect)
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  }
}
