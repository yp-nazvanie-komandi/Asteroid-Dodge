import React from 'react'

import AdButton from '../../components/adButton/ad-button'

const Error400: React.FC = () => {
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
