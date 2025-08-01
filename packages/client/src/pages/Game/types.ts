export interface ResourceVisual {
  [key: string]: HTMLImageElement
}

export interface ResourceAudio {
  name: string
  audio: HTMLAudioElement
}

export interface ResourceAudios {
  explosions: ResourceAudio[]
  lasers: ResourceAudio[]
  health: ResourceAudio[]
}

export interface GameResources {
  visuals: ResourceVisual
  audio: ResourceAudios
}

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}
