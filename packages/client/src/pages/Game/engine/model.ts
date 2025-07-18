// game/models/GameModel.ts
import { Rectangle } from '../utils/geometry'
import { SimpleBox } from '../entities/base'
import { BasicColors } from '../utils/colors'
import Settings from '../settings'

export class GameModel {
  public score = 0
  public playerLose = false
  public lastFrameTime = 0
  public animationId = 0
  public keys: { [key: string]: boolean } = {}

  public player: SimpleBox
  public bullets: SimpleBox[] = []
  public enemies: SimpleBox[] = []

  constructor(private settings: Settings) {
    this.settings = settings
    this.player = new SimpleBox(
      {
        x: settings.CANVAS_WIDTH / 2 - settings.PLAYER_WIDTH / 2,
        y: settings.CANVAS_HEIGHT - settings.PLAYER_HEIGHT - 10,
        width: settings.PLAYER_WIDTH,
        height: settings.PLAYER_HEIGHT,
      } as Rectangle,
      BasicColors.RED
    )
  }

  spawnEnemy() {
    this.enemies.push(
      new SimpleBox(
        {
          x:
            Math.random() *
            (this.settings.CANVAS_WIDTH - this.settings.ENEMY_WIDTH),
          y: -this.settings.ENEMY_HEIGHT,
          width: this.settings.ENEMY_WIDTH,
          height: this.settings.ENEMY_HEIGHT,
        } as Rectangle,
        BasicColors.BLUE
      )
    )
  }

  initControls() {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      //console.log('Remove handlers');
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }
}
