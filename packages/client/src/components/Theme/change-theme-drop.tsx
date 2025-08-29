import { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import './style.scss'
import { useGetAuthUserQuery } from '../../redux/api/Auth/enhanced/api'

export interface AttachedThemeResponse {
  id: number
  name: string
}

export interface HttpErrorBody {
  error: string
}

export default function ChangeThemeDrop({ onChange }) {
  const { data: user } = useGetAuthUserQuery()

  const cookieMatch = document?.cookie?.match(
    '(^|;)\\s*' + 'theme' + '\\s*=\\s*([^;]+)',
  )
  const themeValue = cookieMatch ? cookieMatch.pop() : undefined

  const [theme, setTheme] = useState(themeValue || 'light')

  const handleChange = async (event: SelectChangeEvent) => {
    setTheme(event.target.value)
    onChange(event.target.value)
    document.cookie = `theme=${event.target.value}; path=/`

    if (user !== undefined) {
      // Если пользователь авторизован, отправляем на сервер
      try {
        const response = await fetch(
          'http://localhost:3001/api/v1/users/theme/',
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ themeName: event.target.value }),
          },
        )

        if (response.ok) {
          const data: AttachedThemeResponse = await response.json()
          return data
        } else {
          // Обработка ошибок
          const errorData: HttpErrorBody = await response.json()
          console.error('Ошибка получения темы:', errorData)
          return null
        }
      } catch (error) {
        console.error('Ошибка сети:', error)
        return null
      }
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
