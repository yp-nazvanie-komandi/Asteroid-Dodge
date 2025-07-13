import Button from '../../components/Button/Button'
import React, { useState, useEffect } from 'react'

export const Game = () => {
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [countdown, setCountdown] = useState(3)
  let timerId: ReturnType<typeof setInterval> | undefined

  const startCountdown = () => {
    setCountdown(3) // начинаем с 3
    setIsTimerActive(true)
  }

  useEffect(() => {
    if (isTimerActive) {
      timerId = setInterval(() => {
        setCountdown(prev => {
          if (prev > 0) {
            return prev - 1
          } else {
            // когда достигнем 0 — остановить таймер
            clearInterval(timerId)
            return 0
          }
        })
      }, 1000)
    }
    return () => {
      if (timerId !== undefined) {
        clearInterval(timerId)
      }
    }
  }, [isTimerActive])

  return (
    <div className={'container container--start'}>
      {!isTimerActive ? (
        <Button text={'Ready'} onClick={startCountdown} />
      ) : (
        <div>
          <h1 className={'title'}>{countdown}</h1>
          <p>секунд до начала игры</p>
        </div>
      )}
    </div>
  )
}
