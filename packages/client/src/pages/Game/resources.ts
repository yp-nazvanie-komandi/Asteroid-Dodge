import asteroidUrl from '../../assets/img/entities/asteroid.png'
import enemy1 from '../../assets/img/entities/enemy-1.png'
import enemy2 from '../../assets/img/entities/enemy-2.png'
import enemy3 from '../../assets/img/entities/enemy-3.png'
import cruftLeftUrl from '../../assets/img/entities/space-cruft-left.png'
import cruftRightUrl from '../../assets/img/entities/space-cruft-right.png'
import cruftUrl from '../../assets/img/entities/space-cruft.png'
// audio
import laser1 from '../../assets/audio/lasers/laser1.mp3'
import laser2 from '../../assets/audio/lasers/laser2.mp3'
import laser3 from '../../assets/audio/lasers/laser3.mp3'
import explosion1 from '../../assets/audio/explosions/explosion1.mp3'
import explosion2 from '../../assets/audio/explosions/explosion2.mp3'
import explosion3 from '../../assets/audio/explosions/explosion3.mp3'
import explosion4 from '../../assets/audio/explosions/explosion4.mp3'
import healthDown1 from '../../assets/audio/health/down1.mp3'

import { ResourceVisual, ResourceAudios } from './types'

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

const loadAudio = (url: string): Promise<HTMLAudioElement> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url)
    audio.oncanplaythrough = () => resolve(audio)
    audio.onerror = reject
  })
}

const loadAllImages = async (): Promise<ResourceVisual> => {
  const imageUrls = {
    asteroid: asteroidUrl,
    cruft: cruftUrl,
    enemy1: enemy1,
    enemy2: enemy2,
    enemy3: enemy3,
    cruftLeft: cruftLeftUrl,
    cruftRight: cruftRightUrl,
  }

  const result: ResourceVisual = {}

  await Promise.all(
    Object.entries(imageUrls).map(async ([key, url]) => {
      result[key] = await loadImage(url)
    }),
  )

  return result
}

const loadAllAudio = async (): Promise<ResourceAudios> => {
  const audioMap = {
    lasers: [
      { name: 'laser1', url: laser1 },
      { name: 'laser2', url: laser2 },
      { name: 'laser3', url: laser3 },
    ],
    explosions: [
      { name: 'explosion1', url: explosion1 },
      { name: 'explosion2', url: explosion2 },
      { name: 'explosion3', url: explosion3 },
      { name: 'explosion4', url: explosion4 },
    ],
    health: [{ name: 'healthDown1', url: healthDown1 }],
  }

  const result: ResourceAudios = {
    lasers: [],
    explosions: [],
    health: [],
  }

  await Promise.all(
    Object.entries(audioMap).map(async ([groupKey, groupValues]) => {
      result[groupKey as keyof ResourceAudios] = await Promise.all(
        groupValues.map(async ({ name, url }) => {
          const audio = await loadAudio(url)
          return { name, audio }
        }),
      )
    }),
  )

  return result
}

const loadAudioGallery = async () => {
  try {
    // Загружаем аудио и ждем завершения
    const result = await loadAllAudio()

    return result
  } catch (error) {
    console.error('Ошибка загрузки аудио:', error)
    throw error
  }
}

const loadImageGallery = async () => {
  try {
    // Загружаем изображение и ждем завершения
    const result = await loadAllImages()

    return result
  } catch (error) {
    console.error('Ошибка загрузки изображений:', error)
    throw error
  }
}

export const loadResources = async () => {
  const [resourcesVisual, resourcesAudio] = await Promise.all([
    loadImageGallery(),
    loadAudioGallery(),
  ])

  return {
    visuals: resourcesVisual,
    audio: resourcesAudio,
  }
}
