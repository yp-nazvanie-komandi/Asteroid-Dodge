import { useRef, useEffect, useState } from 'react'
import Settings from './settings'
import { GameEngine } from './engine/engine'
import { loadResources } from './resources'
import { GameResources } from './types'
import { GameOver } from '../Game-over/Game-over'
import { Typography, CircularProgress } from '@mui/material'

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

  const gameResourcesRef = useRef<GameResources | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (gameResourcesRef.current) {
      const settings = new Settings()
      engineRef.current = new GameEngine(
        settings,
        canvas,
        ctx,
        gameResourcesRef.current,
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
        },
      )

      engineRef.current.start()
    }

    return () => {
      engineRef.current?.stop()
    }
  }, [isLoading])

  useEffect(() => {
    const loadGameResources = async () => {
      const startTime = performance.now()
      gameResourcesRef.current = await loadResources()

      if (
        !gameResourcesRef.current.visuals ||
        !Object.values(gameResourcesRef.current.visuals)
      ) {
        throw new Error('Game visuals resources not loaded')
      }

      if (
        !gameResourcesRef.current.audio ||
        !Object.values(gameResourcesRef.current.audio)
      ) {
        throw new Error('Game audio resources not loaded')
      }

      // Вычисляем оставшееся время до 2 секунд
      const elapsed = performance.now() - startTime
      const remainingDelay = Math.max(2000 - elapsed, 0)
      // Ждем оставшееся время
      await new Promise(resolve => setTimeout(resolve, remainingDelay))
    }

    loadGameResources()
      .then(() => {
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div className={'container container--play'}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {playerLose && showGameOver ? (
            <GameOver countPoints={score} />
          ) : (
            <div className={'count'}>
              <Typography component="h1" className="title" marginBottom={2}>
                {score}

                <div className={'count-life'}>
                  {Array.from({ length: countLifes }).map((_, index) => (
                    <span key={index}>❤️</span>
                  ))}
                </div>
              </Typography>

              <canvas
                ref={canvasRef}
                width={settings.CANVAS_WIDTH}
                height={settings.CANVAS_HEIGHT}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
