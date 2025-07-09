import React from 'react'

import AdButton from '../../components/AdButton/AdButton'

const Error400 = () => {
  return (
    <div className={'container container--error'}>
      <h1 className={'error'}>404</h1>
      <p>Ой, что то пошло не так</p>
      <AdButton text={'Go back'} to="-1" />
      <AdButton text={'Main Page'} to="/" />
    </div>
  )
}

export default Error400
