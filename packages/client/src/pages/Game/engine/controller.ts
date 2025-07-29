import { GameModel } from './model'
import Settings from '../settings'
import { Direction } from '../entities/types'
import { Asteroid } from '../entities/asteroid'

type EnemyKeys = 'asteroids' | 'enemy'

export class GameController {
  private lastSpawn = 0

  constructor(private model: GameModel, private settings: Settings) {}

  update(dt: number): boolean {
    // Движение игрока
    if (this.model.keys['ArrowLeft']) {
      this.model.player.x = Math.max(
        0,
        this.model.player.x - this.settings.SPEED_PALYER * dt
      )
      this.model.player.update(Direction.Right)
    }
    if (this.model.keys['ArrowRight']) {
      this.model.player.x = Math.min(
        this.settings.CANVAS_WIDTH - this.model.player.width,
        this.model.player.x + this.settings.SPEED_PALYER * dt
      )
      this.model.player.update(Direction.Left)
    }

    // Движение пуль
    for (let i = this.model.bullets.length - 1; i >= 0; i--) {
      this.model.bullets[i].y -= this.settings.SPEED_BULLET * dt
      if (this.model.bullets[i].y < 0) this.model.bullets.splice(i, 1)
    }

    // Движение астероидов
    for (let i = this.model.enemies.length - 1; i >= 0; i--) {
      this.model.enemies[i].y += this.settings.SPEED_ENEMY * dt
      if (this.model.enemies[i].y > this.settings.CANVAS_HEIGHT) {
        this.model.enemies.splice(i, 1)
        this.model.countLife -= 1
        if (this.model.countLife <= 0) {
          this.model.playerLose = true
          return true
        }
      } else {
        this.model.enemies[i].update(dt)
      }
    }

    const keysBots: EnemyKeys[] = ['asteroids'] // сейчас в игре нет enemy

    // Проверка столкновений
    for (const key of keysBots) {
      const asteroids = this.model.asteroids

      for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i]

        // Проверка с пулями
        for (let j = this.model.bullets.length - 1; j >= 0; j--) {
          const bullet = this.model.bullets[j]
          if (asteroid.collision(bullet)) {
            this.model.bullets.splice(j, 1)
            this.model.asteroids.splice(i, 1)
            this.model.score += 1
            break
          }
        }

        // Проверка с игроком
        if (this.model.player.collision(asteroid)) {
          this.model.playerLose = true
          return true
        }
      }
    }

    return false
  }

  spawnIfNeeded(timestamp: number) {
    if (timestamp - this.lastSpawn > 1000) {
      const spawnAsteroidsOrEnemy = Math.floor(Math.random() * 100) + 1

      if (spawnAsteroidsOrEnemy % 2 === 0) {
        this.model.spawnAsteroids()
      } else {
        this.model.spawnEnemy()
      }
      this.lastSpawn = timestamp
    }
  }

  stop() {
    this.model.bullets = []
    this.model.enemies = []
    cancelAnimationFrame(this.model.animationId)
  }
}
