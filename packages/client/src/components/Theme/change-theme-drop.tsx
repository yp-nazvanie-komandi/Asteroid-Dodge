import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import './style.scss'
import { useGetAuthUserQuery } from '../../redux/api/Auth/enhanced/api'

export default function ChangeThemeDrop() {
  const { data: user } = useGetAuthUserQuery()

  const cookieMatch = document?.cookie?.match(
    '(^|;)\\s*' + 'theme' + '\\s*=\\s*([^;]+)',
  )
  const themeValue = cookieMatch ? cookieMatch.pop() : undefined

  const [theme, setTheme] = useState(themeValue || 'light')

  const handleChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value)

    document.cookie = `theme=${event.target.value}; path=/`

    if (user !== undefined) {
      // Если пользователь авторизован, отправляем на сервер
      fetch('/api/v1/users/theme/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ themeName: event.target.value }),
      })
        .then(res => {
          if (res.ok) return res.json()
          throw new Error('Failed to update theme')
        })
        .then(updatedTheme => {
          // В ответ приходит полный объект темы
          console.log('Обновленная тема:', updatedTheme)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <div className="theme">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Тема</InputLabel>

        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={theme}
          onChange={handleChange}
          label="Тема"
        >
          <MenuItem value={'light'}>Светлая</MenuItem>
          <MenuItem value={'dark'}>Темная</MenuItem>
          <MenuItem value={'pink'}>Розовая</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
