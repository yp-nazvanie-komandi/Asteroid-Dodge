import { Rectangle } from '../types'

export function isRectanglesIntersect(
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

export function isCirclesIntersect(
  rect1: Rectangle,
  rect2: Rectangle
): boolean {
  // Вычисляем центры кругов (предполагаем, что круги вписаны в прямоугольники)
  const circle1 = {
    x: rect1.x + rect1.width / 2,
    y: rect1.y + rect1.height / 2,
    radius: Math.min(rect1.width, rect1.height) / 2,
  }

  const circle2 = {
    x: rect2.x + rect2.width / 2,
    y: rect2.y + rect2.height / 2,
    radius: Math.min(rect2.width, rect2.height) / 2,
  }

  // Вычисляем расстояние между центрами
  const dx = circle1.x - circle2.x
  const dy = circle1.y - circle2.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // Проверяем пересечение (сумма радиусов больше или равна расстоянию)
  return distance <= circle1.radius + circle2.radius
}
