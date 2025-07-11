import { useEffect } from 'react'
import './App.css'
import GameCanvas from './pages/Game/Game'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <GameCanvas></GameCanvas>
    </div>
  )
}

export default App
