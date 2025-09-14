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
  const [canvasHeight, setCanvasHeight] = useState(settings.CANVAS_HEIGHT)

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
        }
      )
      engineRef.current.start()
    }

    return () => {
      engineRef.current?.stop()
    }
  }, [isLoading])

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight || 900
      setCanvasHeight(newHeight)

      // Обновляем размеры canvas
      const canvas = canvasRef.current
      if (canvas) {
        canvas.height = newHeight
      }

      // Обновляем позицию игрока в модели
      if (engineRef.current?.model?.player) {
        const player = engineRef.current.model.player
        // Убеждаемся, что игрок не выходит за границы по вертикали
        player.y = Math.min(newHeight - settings.PLAYER_HEIGHT, player.y)
        // Убеждаемся, что игрок не выходит за границы по горизонтали
        player.x = Math.max(
          0,
          Math.min(settings.CANVAS_WIDTH - settings.PLAYER_WIDTH, player.x)
        )

        // Если игрок оказался за границами, перемещаем его в центр нижней части экрана
        if (player.y > newHeight - settings.PLAYER_HEIGHT) {
          player.y = newHeight - settings.PLAYER_HEIGHT
        }
        if (
          player.x < 0 ||
          player.x > settings.CANVAS_WIDTH - settings.PLAYER_WIDTH
        ) {
          player.x = settings.CANVAS_WIDTH / 2 - settings.PLAYER_WIDTH / 2
        }
      }

      // Обновляем границы движения игрока в контроллере
      if (engineRef.current?.controller) {
        engineRef.current.controller.updateCanvasHeight(newHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    // Также слушаем изменения полноэкранного режима
    const handleFullscreenChange = () => {
      // Небольшая задержка для корректного обновления размеров
      setTimeout(handleResize, 150)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

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

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight || 900
      setCanvasHeight(newHeight)

      // Обновляем размеры canvas
      const canvas = canvasRef.current
      if (canvas) {
        canvas.height = newHeight
      }

      // Обновляем позицию игрока в модели
      if (engineRef.current?.model?.player) {
        const player = engineRef.current.model.player
        player.y = newHeight - settings.PLAYER_HEIGHT
        // Центрируем игрока по горизонтали
        player.x = settings.CANVAS_WIDTH / 2 - settings.PLAYER_WIDTH / 2
      }

      // Обновляем границы движения игрока в контроллере
      if (engineRef.current?.controller) {
        // Обновляем высоту canvas в настройках для корректной работы контроллера
        Object.defineProperty(settings, 'CANVAS_HEIGHT', {
          get: () => newHeight,
          configurable: true,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    // Также слушаем изменения полноэкранного режима
    const handleFullscreenChange = () => {
      // Небольшая задержка для корректного обновления размеров
      setTimeout(handleResize, 100)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className={'container container--play'}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {playerLose && showGameOver ? (
            <GameOver countPoints={score} />
          ) : (
            <div className={'count'} style={{ height: canvasHeight }}>
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
                height={canvasHeight}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
