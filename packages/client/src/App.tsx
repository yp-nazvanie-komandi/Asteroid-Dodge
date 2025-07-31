import { Theme } from './components/Theme/Theme'
import { Router } from './components/Router/Router'
import { Store } from './components/Store/Store'
import { FullscreenToggle } from './components/FullscreenToggle/FullscreenToggle'

import './App.scss'

function App() {
  return (
    <Theme>
      <Store>
        <Router />
        <FullscreenToggle />
      </Store>
    </Theme>
  )
}

export default App
