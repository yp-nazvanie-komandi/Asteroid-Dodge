import { Rectangle } from './utils/geometry'
import React, { useRef, useEffect, useState } from 'react'
import { SimpleBox } from './entities/base'
import { BasicColors } from './utils/colors'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 20
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 20
const BULLET_WIDTH = 4
const BULLET_HEIGHT = 10

// Скорость
const SPEED_PALYER = 200
const SPEED_ENEMY = 50
const SPEED_BULLET = 300

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [playerLose, setPlayerLose] = useState(false)

  const player = new SimpleBox(
    {
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - PLAYER_HEIGHT - 10,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    } as Rectangle,
    BasicColors.WHITE
  )

  const bullets: SimpleBox[] = []
  const enemies: SimpleBox[] = []
  const keys: Record<string, boolean> = {}

  const spawnEnemy = () => {
    enemies.push(
      new SimpleBox(
        {
          x: Math.random() * (CANVAS_WIDTH - ENEMY_WIDTH),
          y: -ENEMY_HEIGHT,
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
        } as Rectangle,
        BasicColors.BLUE
      )
    )
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Игрок
    player.draw(ctx)

    // Пули
    bullets.forEach(bullet => {
      bullet.draw(ctx)
    })

    // Противники
    enemies.forEach(enemy => {
      enemy.draw(ctx)
    })

    // Очки
    // ctx.fillStyle = 'white';
    // ctx.font = '16px Arial';
    // ctx.fillText(`Score: ${score}`, 10, 20);
  }

  const update = (dt: number): boolean => {
    // Движение игрока
    if (keys['ArrowLeft']) player.x = Math.max(0, player.x - SPEED_PALYER * dt)
    if (keys['ArrowRight'])
      player.x = Math.min(
        CANVAS_WIDTH - player.width,
        player.x + SPEED_PALYER * dt
      )

    // Движение пулей
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].y = bullets[i].y - SPEED_BULLET * dt
      if (bullets[i].y < 0) bullets.splice(i, 1)
    }

    // Движение противников
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].y = enemies[i].y + SPEED_ENEMY * dt
      if (enemies[i].y > CANVAS_HEIGHT) enemies.splice(i, 1)
    }

    // Определение столкновение
    let playerLose = false

    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i]

      // С пулями
      for (let j = bullets.length - 1; j >= 0; j--) {
        const bullet = bullets[j]
        if (enemy.collision(bullet)) {
          console.log('Enemy shot!')
          bullets.splice(j, 1)
          enemies.splice(i, 1)
          setScore(prev => prev + 1)
          break
        }
      }

      // С противниками
      if (player.collision(enemy)) {
        //alert(`Game Over! Final Score: ${score}`);
        console.log('Boom!')
        console.log(player, enemy)
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

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true
      if (e.key === ' ') {
        bullets.push(
          new SimpleBox(
            {
              x: player.x + player.width / 2 - BULLET_WIDTH / 2,
              y: player.y,
              width: BULLET_WIDTH,
              height: BULLET_HEIGHT,
            } as Rectangle,
            BasicColors.YELLOW
          )
        )
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    let lastSpawn = 0
    let lastTime = 0

    let animationId = -1

    const loop = (timestamp: number) => {
      const now = Date.now()
      if (timestamp - lastSpawn > 1000) {
        spawnEnemy()
        lastSpawn = timestamp
      }
      const dt = (now - lastTime) / 1000.0

      const playerIsLose = update(dt)

      draw(ctx)

      lastTime = now

      if (playerIsLose) {
        console.log('player is lose')
        cancelAnimationFrame(animationId)
        return
      }

      animationId = requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
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
