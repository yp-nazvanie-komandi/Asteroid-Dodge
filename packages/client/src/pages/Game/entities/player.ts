import { Rectangle } from '../types.js'
import { isCirclesIntersect } from '../utils/geometry.js'
import { Entity } from './base.js'
import { Direction, Drawable, Updateable } from './types.js'

export class SpaceCraft extends Entity implements Drawable, Updateable {
  private visual: HTMLImageElement
  private visualLeft: HTMLImageElement
  private visualRight: HTMLImageElement

  private direction: Direction = Direction.Unknown

  constructor(
    rect: Rectangle,
    visualLeft: HTMLImageElement,
    visualRight: HTMLImageElement,
    visual: HTMLImageElement
  ) {
    super(rect)
    this.visual = visual
    this.visualLeft = visualLeft
    this.visualRight = visualRight
  }

  update(direction: Direction) {
    this.direction = direction
  }

  draw(ctx: CanvasRenderingContext2D) {
    switch (this.direction) {
      case Direction.Left:
        ctx.drawImage(this.visualLeft, this.x, this.y, this.width, this.height)
        break
      case Direction.Right:
        ctx.drawImage(this.visualRight, this.x, this.y, this.width, this.height)
        break
      default:
        ctx.drawImage(this.visual, this.x, this.y, this.width, this.height)
        break
    }
    this.direction = Direction.Unknown
  }

  collision(another: Entity): boolean {
    return isCirclesIntersect(this.rect, another.rect)
  }
}
