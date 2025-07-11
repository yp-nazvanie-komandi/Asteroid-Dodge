export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

export function IsRectanglesIntersect(
  rect1: Rectangle,
  rect2: Rectangle
): boolean {
  const left = Math.max(rect1.x, rect2.x)
  const right = Math.min(rect1.x + rect1.width, rect2.x + rect2.width)

  const top = Math.max(rect1.y, rect2.y)
  const bottom = Math.min(rect1.y + rect1.height, rect2.y + rect2.height)

  const width = right - left
  const height = bottom - top

  if (width < 0 || height < 0) {
    return false // площадь пересечения 0
  }

  return true // площадь пересечения width * height;
}
