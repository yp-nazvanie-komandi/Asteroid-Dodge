import { Theme } from './components/Theme/Theme'
import { Router } from './components/Router/Router'
import { Store } from './components/Store/Store'

import './App.scss'

function App() {
  return (
    <Theme>
      <Store>
        <Router />
      </Store>
    </Theme>
  )
}

export default App
