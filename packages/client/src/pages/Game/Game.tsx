import Button from '../../components/Button/Button'
import { useState, useEffect, useRef } from 'react'

export const Game = () => {
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [displayCount, setDisplayCount] = useState(3) // состояние для отображения
  const countdownRef = useRef(3) // реф для хранения текущего значения
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCountdown = () => {
    setIsTimerActive(true)
  }

  useEffect(() => {
    if (isTimerActive) {
      timerIdRef.current = setInterval(() => {
        if (countdownRef.current > 0) {
          countdownRef.current -= 1
          setDisplayCount(countdownRef.current)
        } else {
          if (timerIdRef.current !== null) {
            clearInterval(timerIdRef.current)
          }
          setIsTimerActive(false)
        }
      }, 1000)
    }
    return () => {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current)
      }
    }
  }, [isTimerActive])

  return (
    <div className={'container container--start'}>
      {!isTimerActive ? (
        <Button text={'Ready'} onClick={startCountdown} />
      ) : (
        <div>
          <h1 className={'title'}>{displayCount}</h1>
          <p>секунд до начала игры</p>
        </div>
      )}
    </div>
  )
}
