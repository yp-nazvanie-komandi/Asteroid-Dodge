import React from 'react'

import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

const Error400 = () => {
  const navigate = useNavigate()

  return (
    <div className={'container container--error'}>
      <h1 className={'error'}>404</h1>
      <p>Ой, что то пошло не так</p>
      <Button
        text={'Go back'}
        onClick={() => {
          navigate(-1)
        }}
      />
      <Button
        text={'Main Page'}
        onClick={() => {
          navigate('/')
        }}
      />
    </div>
  )
}

export default Error400
