import { SimpleBox } from '../entities/base'
import { BasicColors } from '../utils/colors'
import Settings from '../settings'
import { ResourceVisual, Rectangle } from '../types'
import { Asteroid } from '../entities/asteroid'
import { SpaceCraft } from '../entities/player'
import { Enemy } from '../entities/enemy'

export class GameModel {
  public score = 0
  public playerLose = false
  public lastFrameTime = 0
  public animationId = 0
  public keys: { [key: string]: boolean } = {}
  public countLife = 3
  public resources: ResourceVisual

  public player: SpaceCraft
  public bullets: SimpleBox[] = []
  public asteroids: Asteroid[] = []
  public enemies: Enemy[] = []

  constructor(private settings: Settings, resources: ResourceVisual) {
    this.settings = settings
    this.resources = resources

    this.player = new SpaceCraft(
      {
        x: settings.CANVAS_WIDTH / 2 - settings.PLAYER_WIDTH / 2,
        y: settings.CANVAS_HEIGHT - settings.PLAYER_HEIGHT, // - 10,
        width: settings.PLAYER_WIDTH,
        height: settings.PLAYER_HEIGHT,
      } as Rectangle,
      this.resources['cruftLeft'],
      this.resources['cruftRight'],
      this.resources['cruft']
    )
  }

  spawnAsteroids() {
    this.asteroids.push(
      new Asteroid(
        {
          x:
            Math.random() *
            (this.settings.CANVAS_WIDTH - this.settings.ENEMY_WIDTH),
          y: -this.settings.ENEMY_HEIGHT,
          width: this.settings.ENEMY_WIDTH,
          height: this.settings.ENEMY_HEIGHT,
        } as Rectangle,
        this.resources['asteroid']
      )
    )
  }

  spawnEnemy() {
    this.enemies.push(
      new Enemy(
        {
          x:
            Math.random() *
            (this.settings.CANVAS_WIDTH - this.settings.ENEMY_WIDTH),
          y: -this.settings.ENEMY_HEIGHT,
          width: this.settings.ENEMY_WIDTH,
          height: this.settings.ENEMY_HEIGHT,
        } as Rectangle,
        this.resources[`enemy${Math.floor(Math.random() * 3) + 1}`]
      )
    )
  }

  initControls() {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault() // паредотвращаем событие прокрутки страницы, стандартное поведение браузера

      this.keys[e.key] = true

      // Стрельба при нажатии пробела
      if (e.key === ' ') {
        this.bullets.push(
          new SimpleBox(
            {
              x:
                this.player.x +
                this.player.width / 2 -
                this.settings.BULLET_WIDTH / 2,
              y: this.player.y - this.settings.BULLET_HEIGHT,
              width: this.settings.BULLET_WIDTH,
              height: this.settings.BULLET_HEIGHT,
            } as Rectangle,
            BasicColors.GREEN
          )
        )
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      this.keys[e.key] = false
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }
}
