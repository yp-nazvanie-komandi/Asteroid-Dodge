import React, { useRef, useEffect, useState } from 'react'
import Settings from './settings'
import { GameEngine } from './engine/engine.js'
import { ResourceVisual } from './types.js'
import LoadImageGallery from './resources.js'
import CircularProgress from '@mui/material/CircularProgress'
import { GameOver } from '../Game-over/Game-over.js'
import { Typography } from '@mui/material'

const settings = new Settings()

export const GameCanvas = () => {
  // Реактивные элементы
  const [score, setScore] = useState(0)
  const [countLifes, setCountLifes] = useState(3)
  const [playerLose, setPlayerLose] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showGameOver, setShowGameOver] = useState(false)

  // Не реактивные элементы
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<GameEngine | null>(null)

  const imageGallery = useRef<ResourceVisual | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (imageGallery.current) {
      const settings = new Settings()
      engineRef.current = new GameEngine(
        settings,
        canvas,
        ctx,
        imageGallery.current,
        {
          setScore,
          setCountLifes,
          setPlayerLose: (value: boolean) => {
            if (value) {
              setPlayerLose(true)
              setTimeout(() => setShowGameOver(true), 1000) // 1 секунда задержки
            } else {
              setPlayerLose(false)
              setShowGameOver(false)
            }
          },
        }
      )

      engineRef.current.start()
    }

    return () => {
      engineRef.current?.stop()
    }
  }, [isLoading])

  useEffect(() => {
    const loadImages = async () => {
      const startTime = performance.now()
      imageGallery.current = await LoadImageGallery()
      if (!imageGallery.current || !imageGallery.current['asteroid']) {
        throw new Error('Asteroid image not loaded')
      }
      // Вычисляем оставшееся время до 2 секунд
      const elapsed = performance.now() - startTime
      const remainingDelay = Math.max(2000 - elapsed, 0)
      // Ждем оставшееся время
      await new Promise(resolve => setTimeout(resolve, remainingDelay))
    }

    loadImages()
      .then(() => {
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Занимает всю высоту экрана
        width: '100vw', // Занимает всю ширину экрана
        margin: 0,
      }}
    >
      <div className={'container--play'}>
        {isLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <div>
            {playerLose && showGameOver ? (
              <GameOver countPoints={score} />
            ) : (
              <>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Array.from({ length: countLifes }).map((_, index) => (
                    <span
                      key={index}
                      style={{ color: 'red', fontSize: '24px' }}
                    >
                      ❤️
                    </span>
                  ))}
                </div>
                <p>Score: {score}</p>
                <div>
                  <Typography component="h1" className="title" marginBottom={2}>
                    {score}
                  </Typography>
                  <canvas
                    ref={canvasRef}
                    width={settings.CANVAS_WIDTH}
                    height={settings.CANVAS_HEIGHT}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
