import Button from '../../components/Button/Button'

export const GameOver = () => {
  return (
    <div className={'container container--game-over'}>
      <Button text={'Play again'} />
      <Button text={'Main menu'} />
    </div>
  )
}
