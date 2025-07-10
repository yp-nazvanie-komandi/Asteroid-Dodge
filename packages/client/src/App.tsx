import { useEffect } from 'react'
import './App.css'
import { Router } from './components/Router/Router'

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

  return <Router />
}

export default App
