import { useNavigate } from 'react-router'
import Button from '../../components/Button/Button'
import { useState, useEffect, useRef } from 'react'

export const Start = () => {
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [displayCount, setDisplayCount] = useState(3) // состояние для отображения
  const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const navigate = useNavigate()

  const startCountdown = () => {
    setIsTimerActive(true)
  }

  useEffect(() => {
    if (isTimerActive) {
      timerIdRef.current = setInterval(() => {
        setDisplayCount(currentDisplayCount => {
          if (currentDisplayCount > 0) {
            return currentDisplayCount - 1
          }
          return currentDisplayCount
        })
      }, 1000)
    }
    return () => {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current)
      }
    }
  }, [isTimerActive])

  useEffect(() => {
    if (displayCount === 0 && timerIdRef.current !== null) {
      clearInterval(timerIdRef.current)
      navigate('/game')
    }
  }, [displayCount])

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
