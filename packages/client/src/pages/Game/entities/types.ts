export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void
}

export interface Updateable {
  update(dt: number): void
}

export type Position = {
  x: number
  y: number
}

export type Size = {
  height: number
  width: number
}

export enum Direction {
  Left, // 0
  Right, // 1
  Unknown, // 3
}
