import { GameModel } from './model'
import Settings from '../settings'
import { Direction } from '../entities/types'
import { SimpleBox } from '../entities/base'
import { getRandomElement } from '../utils/collections'
import { Enemy } from '../entities/enemy'
import { Rectangle } from '../types'
import { BasicColors } from '../utils/colors'
import showNotification from '../../../utils/showNotification'

export class GameController {
  private lastSpawn = 0
  private lastShoot = 0
  private isShowedNotification = false

  constructor(
    private model: GameModel,
    private settings: Settings,
  ) {}

  update(dt: number): boolean {
    if (this.model.countLife <= 0) {
      this.model.playerLose = true
      return true
    }

    // Движение игрока
    if (this.model.keys['ArrowLeft']) {
      this.model.player.x = Math.max(
        0,
        this.model.player.x - this.settings.SPEED_PALYER * dt,
      )
      this.model.player.update(Direction.Right)
    }
    if (this.model.keys['ArrowRight']) {
      this.model.player.x = Math.min(
        this.settings.CANVAS_WIDTH - this.model.player.width,
        this.model.player.x + this.settings.SPEED_PALYER * dt,
      )
      this.model.player.update(Direction.Left)
    }

    // Стрельба вражеских кораблей
    this.shootIfNeeded()

    // Движение пуль
    for (let i = this.model.bullets.length - 1; i >= 0; i--) {
      if (this.model.bullets[i].color === BasicColors.RED) {
        this.model.bullets[i].y += this.settings.SPEED_BULLET * dt
        if (this.model.bullets[i].y > this.settings.CANVAS_HEIGHT)
          this.model.bullets.splice(i, 1)
      } else {
        this.model.bullets[i].y -= this.settings.SPEED_BULLET * dt
        if (this.model.bullets[i].y < 0) this.model.bullets.splice(i, 1)
      }
    }

    // Обновление позиций противников
    for (let i = this.model.enemies.length - 1; i >= 0; i--) {
      this.model.enemies[i].y += this.settings.SPEED_ENEMY * dt
      if (this.model.enemies[i].y > this.settings.CANVAS_HEIGHT) {
        this.model.enemies.splice(i, 1)
      } else {
        this.model.enemies[i].update(dt)
      }
    }

    // Обновление позиций астероидов
    for (let i = this.model.asteroids.length - 1; i >= 0; i--) {
      this.model.asteroids[i].y += this.settings.SPEED_ASTEROID * dt
      if (this.model.asteroids[i].y > this.settings.CANVAS_HEIGHT) {
        this.model.asteroids.splice(i, 1)
        this.model.countLife -= 1

        const healthDown = this.model.resources.audio.health[0]
        healthDown.audio.play()
      } else {
        this.model.asteroids[i].update(dt)
      }
    }

    // Проверка столкновений вражеских кораблей
    const enemies = this.model.enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemyObj = enemies[i]
      // Проверка с пулями игрока
      for (let j = this.model.bullets.length - 1; j >= 0; j--) {
        const bullet = this.model.bullets[j]
        if (bullet.color === BasicColors.GREEN && enemyObj.collision(bullet)) {
          this.model.bullets.splice(j, 1)
          enemies.splice(i, 1)
          this.model.score += 1

          if (this.model.score > 100 && !this.isShowedNotification) {
            this.showNotificationScore()
          }

          const randomExplosion = getRandomElement(
            this.model.resources.audio.explosions,
          )

          randomExplosion?.audio.play()

          break
        }
        if (
          bullet.color === BasicColors.RED &&
          this.model.player.collision(bullet)
        ) {
          this.model.playerLose = true
          return true
        }
      }

      // Проверка с игроком
      if (this.model.player.collision(enemyObj)) {
        this.model.playerLose = true
        return true
      }
    }

    // Проверка столкновений c астероидами
    const asteroids = this.model.asteroids
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroidOdj = asteroids[i]
      // Проверка с пулями
      for (let j = this.model.bullets.length - 1; j >= 0; j--) {
        const bullet = this.model.bullets[j]
        if (asteroidOdj.collision(bullet)) {
          this.model.bullets.splice(j, 1)
          asteroids.splice(i, 1)
          this.model.score += 1

          if (this.model.score > 100 && !this.isShowedNotification) {
            this.showNotificationScore()
          }

          const randomExplosion = getRandomElement(
            this.model.resources.audio.explosions,
          )

          randomExplosion?.audio.play()

          break
        }
      }
      // Проверка с игроком
      if (this.model.player.collision(asteroidOdj)) {
        this.model.playerLose = true
        return true
      }
    }

    return false
  }

  shootIfNeeded() {
    // Случайный вражеский корабль стреляет
    if (performance.now() - this.lastShoot > 2000) {
      if (this.model.enemies.length > 0) {
        const randomEnemy = getRandomElement(this.model.enemies) as Enemy

        const randomLaser = getRandomElement(this.model.resources.audio.lasers)

        this.model.bullets.push(
          new SimpleBox(
            {
              x:
                randomEnemy.x +
                randomEnemy.width / 2 -
                this.settings.BULLET_WIDTH / 2,
              y: randomEnemy.y - this.settings.BULLET_HEIGHT,
              width: this.settings.BULLET_WIDTH,
              height: this.settings.BULLET_HEIGHT,
            } as Rectangle,
            BasicColors.RED,
          ),
        )

        if (randomLaser) {
          randomLaser.audio.currentTime = 0
          randomLaser.audio.play()
        }
      }
      this.lastShoot = performance.now()
    }
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

  showNotificationScore() {
    showNotification('Поздравляем!', {
      body: 'Вы достигли более 100 очков!',
    })

    this.isShowedNotification = true
  }

  stop() {
    cancelAnimationFrame(this.model.animationId)
  }
}
