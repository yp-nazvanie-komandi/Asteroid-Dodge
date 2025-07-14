import React, { useRef, useEffect, useState } from 'react'
import Settings from './settings'
import { GameEngine } from './engine/engine.js'

const settings = new Settings()

const GameCanvas = () => {
  // Реактивные элементы
  const [score, setScore] = useState(0)
  const [playerLose, setPlayerLose] = useState(false)

  // Не реактивные элементы
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<GameEngine | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const settings = new Settings()
    engineRef.current = new GameEngine(settings, canvas, ctx, {
      setScore,
      setPlayerLose,
    })

    engineRef.current.start()

    return () => {
      engineRef.current?.stop()
    }
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={settings.CANVAS_WIDTH}
        height={settings.CANVAS_HEIGHT}
        style={{ backgroundColor: 'black' }}
      />
      {playerLose ? (
        <>
          <p>Вы проиграли!</p>
          <button onClick={() => document.location.reload()}>
            Играть снова
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default GameCanvas
