class Settings {
  CANVAS_WIDTH: number = parseInt(import.meta.env.CANVAS_WIDTH as string) || 800
  CANVAS_HEIGHT: number =
    parseInt(import.meta.env.CANVAS_HEIGHT as string) || 600

  PLAYER_WIDTH: number = parseInt(import.meta.env.PLAYER_WIDTH as string) || 50
  PLAYER_HEIGHT: number =
    parseInt(import.meta.env.PLAYER_HEIGHT as string) || 20

  ENEMY_WIDTH: number = parseInt(import.meta.env.ENEMY_WIDTH as string) || 40
  ENEMY_HEIGHT: number = parseInt(import.meta.env.ENEMY_HEIGHT as string) || 20

  BULLET_WIDTH: number = parseInt(import.meta.env.BULLET_WIDTH as string) || 4
  BULLET_HEIGHT: number =
    parseInt(import.meta.env.BULLET_HEIGHT as string) || 10

  SPEED_PALYER: number = parseInt(import.meta.env.SPEED_PALYER as string) || 200
  SPEED_ENEMY: number = parseInt(import.meta.env.SPEED_ENEMY as string) || 50
  SPEED_BULLET: number = parseInt(import.meta.env.SPEED_BULLET as string) || 300
}

export default Settings
