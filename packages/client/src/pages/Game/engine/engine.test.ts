import { GameEngine } from './engine'
import { GameModel } from './model'
import { GameView } from './view'
import { GameController } from './controller'
import Settings from '../settings'
import { ResourceVisual } from '../types'

// Тест будет падать на импортах пока не разберемся с .js импортами из TS файла

jest.mock('./model')
jest.mock('./view')
jest.mock('./controller')

describe('GameEngine', () => {
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let resources: ResourceVisual
  let settings: Settings

  beforeEach(() => {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    resources = {} as ResourceVisual
    settings = {} as Settings
    ;(GameModel as jest.Mock).mockImplementation(() => ({
      initControls: jest.fn(() => jest.fn()),
      score: 42,
      lastFrameTime: performance.now(),
    }))
    ;(GameController as jest.Mock).mockImplementation(() => ({
      spawnIfNeeded: jest.fn(),
      update: jest.fn().mockReturnValue(false),
      stop: jest.fn(),
    }))
    ;(GameView as jest.Mock).mockImplementation(() => ({
      draw: jest.fn(),
    }))
  })

  it('calls setScore and does not call setPlayerLose when player is alive', () => {
    const setScore = jest.fn()
    const setPlayerLose = jest.fn()

    const engine = new GameEngine(settings, canvas, ctx, resources, {
      setScore,
      setPlayerLose,
    })

    engine.start()

    const loop = (engine as any).model.animationId
    cancelAnimationFrame(loop)

    expect(setScore).toHaveBeenCalledWith(42)
    expect(setPlayerLose).not.toHaveBeenCalled()
  })

  it('calls setPlayerLose and stops the game loop', () => {
    ;(GameController as jest.Mock).mockImplementation(() => ({
      spawnIfNeeded: jest.fn(),
      update: jest.fn().mockReturnValue(true),
      stop: jest.fn(),
    }))

    const setPlayerLose = jest.fn()
    const engine = new GameEngine(settings, canvas, ctx, resources, {
      setPlayerLose,
    })

    engine.start()

    const loop = (engine as any).model.animationId
    cancelAnimationFrame(loop)

    expect(setPlayerLose).toHaveBeenCalledWith(true)
  })

  it('calls stop() and removes controls on stop()', () => {
    const removeControls = jest.fn()

    ;(GameModel as jest.Mock).mockImplementation(() => ({
      initControls: () => removeControls,
    }))

    const controllerStop = jest.fn()

    ;(GameController as jest.Mock).mockImplementation(() => ({
      stop: controllerStop,
    }))

    const engine = new GameEngine(settings, canvas, ctx, resources)
    engine.stop()

    expect(removeControls).toHaveBeenCalled()
    expect(controllerStop).toHaveBeenCalled()
  })
})
