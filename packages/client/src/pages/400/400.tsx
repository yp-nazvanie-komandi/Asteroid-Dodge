import React from 'react'

import Button from '../../components/Button/Button'

const Error400 = () => {
  return (
    <div className={'container container--error'}>
      <h1 className={'error'}>404</h1>
      <p>Ой, что то пошло не так</p>
      <Button text={'Go back'} to="-1" />
      <Button text={'Main Page'} to="/" />
    </div>
  )
}

export default Error400
