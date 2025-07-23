import asteroidUrl from '../../assets/img/entities/asteroid.png'
import cruftLeftUrl from '../../assets/img/entities/space-cruft-left.png'
import cruftRightUrl from '../../assets/img/entities/space-cruft-right.png'
import cruftUrl from '../../assets/img/entities/space-cruft.png'
import { ResourceVisual } from './types.js'

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

const loadAllImages = async (): Promise<ResourceVisual> => {
  const imageUrls = {
    asteroid: asteroidUrl,
    cruft: cruftUrl,
    cruftLeft: cruftLeftUrl,
    cruftRight: cruftRightUrl,
  }

  const result: ResourceVisual = {}

  await Promise.all(
    Object.entries(imageUrls).map(async ([key, url]) => {
      result[key] = await loadImage(url)
    })
  )

  return result
}

const LoadImageGallery = async () => {
  let resourceVisual: ResourceVisual = {}

  try {
    // Загружаем изображение и ждем завершения
    resourceVisual = await loadAllImages()
    return resourceVisual
  } catch (error) {
    console.error('Ошибка загрузки изображений:', error)
    throw error
  }
}

export default LoadImageGallery
