import { Rectangle } from './utils/geometry'
import React, { useRef, useEffect, useState } from 'react'
import { SimpleBox } from './entities/base'
import { BasicColors } from './utils/colors'
import Settings from './settings'
import { makeGameEntiriesState } from './init'
import { usePlayerControls } from './hooks/shotingPlayer'

const settings = new Settings()

const GameCanvas = () => {
  // Реактивные элементы
  const [score, setScore] = useState(0)
  const [playerLose, setPlayerLose] = useState(false)

  // Не реактивные элементы
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const gameEntietiesState = makeGameEntiriesState()
  usePlayerControls(gameEntietiesState) // тут обработчики стрельбы для игрока

  const spawnEnemy = () => {
    gameEntietiesState.enemies.push(
      new SimpleBox(
        {
          x: Math.random() * (settings.CANVAS_WIDTH - settings.ENEMY_WIDTH),
          y: -settings.ENEMY_HEIGHT,
          width: settings.ENEMY_WIDTH,
          height: settings.ENEMY_HEIGHT,
        } as Rectangle,
        BasicColors.BLUE
      )
    )
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, settings.CANVAS_WIDTH, settings.CANVAS_HEIGHT) // вся сцена

    // Игрок
    gameEntietiesState.player.draw(ctx)

    // Пули
    gameEntietiesState.bullets.forEach(bullet => {
      bullet.draw(ctx)
    })

    // Противники
    gameEntietiesState.enemies.forEach(enemy => {
      enemy.draw(ctx)
    })

    // Очки
    // ctx.fillStyle = 'white';
    // ctx.font = '16px Arial';
    // ctx.fillText(`Score: ${score}`, 10, 20);
  }

  const update = (dt: number): boolean => {
    // Движение игрока
    if (gameEntietiesState.keys['ArrowLeft'])
      gameEntietiesState.player.x = Math.max(
        0,
        gameEntietiesState.player.x - settings.SPEED_PALYER * dt
      )
    if (gameEntietiesState.keys['ArrowRight'])
      gameEntietiesState.player.x = Math.min(
        settings.CANVAS_WIDTH - gameEntietiesState.player.width,
        gameEntietiesState.player.x + settings.SPEED_PALYER * dt
      )

    // Движение пулей
    for (let i = gameEntietiesState.bullets.length - 1; i >= 0; i--) {
      gameEntietiesState.bullets[i].y =
        gameEntietiesState.bullets[i].y - settings.SPEED_BULLET * dt
      if (gameEntietiesState.bullets[i].y < 0)
        gameEntietiesState.bullets.splice(i, 1)
    }

    // Движение противников
    for (let i = gameEntietiesState.enemies.length - 1; i >= 0; i--) {
      gameEntietiesState.enemies[i].y =
        gameEntietiesState.enemies[i].y + settings.SPEED_ENEMY * dt
      if (gameEntietiesState.enemies[i].y > settings.CANVAS_HEIGHT)
        gameEntietiesState.enemies.splice(i, 1)
    }

    // Определение столкновение
    let playerLose = false

    for (let i = gameEntietiesState.enemies.length - 1; i >= 0; i--) {
      const enemy = gameEntietiesState.enemies[i]

      // С пулями
      for (let j = gameEntietiesState.bullets.length - 1; j >= 0; j--) {
        const bullet = gameEntietiesState.bullets[j]
        if (enemy.collision(bullet)) {
          console.log('Enemy shot!')
          gameEntietiesState.bullets.splice(j, 1)
          gameEntietiesState.enemies.splice(i, 1)
          setScore(prev => prev + 1)
          break
        }
      }

      // С противниками
      if (gameEntietiesState.player.collision(enemy)) {
        //alert(`Game Over! Final Score: ${score}`);
        console.log('Boom!')
        console.log(gameEntietiesState.player, enemy)
        playerLose = true
        setPlayerLose(true)
        break
      }
    }
    return playerLose
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastSpawn = 0

    const loop = (timestamp: number) => {
      const now = performance.now()
      if (timestamp - lastSpawn > 1000) {
        spawnEnemy()
        lastSpawn = timestamp
      }
      const dt = (now - gameEntietiesState.lastFrameTime) / 1000.0

      const playerIsLose = update(dt)

      draw(ctx)

      gameEntietiesState.lastFrameTime = now

      if (playerIsLose) {
        console.log('player is lose')
        cancelAnimationFrame(gameEntietiesState.animationId)
        return
      }

      gameEntietiesState.animationId = requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
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
