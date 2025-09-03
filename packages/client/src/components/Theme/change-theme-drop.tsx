import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import './style.scss'
import { useGetAuthUserQuery } from '../../redux/api/Auth/enhanced/api'
import { useUpdateUserThemeMutation } from '../../redux/api/base'

export interface AttachedThemeResponse {
  id: number
  name: string
}

// Интерфейс для пропсов компонента
interface ChangeThemeDropProps {
  onChange: (themeName: string) => void
}

export interface HttpErrorBody {
  error: string
}

export default function ChangeThemeDrop({ onChange }: ChangeThemeDropProps) {
  const { data: user } = useGetAuthUserQuery()
  const [updateTheme] = useUpdateUserThemeMutation()

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
      updateTheme(themeValue)
    }
  }

  const [themes, setThemes] = useState<AttachedThemeResponse[]>([])

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/themes/')
        if (response.ok) {
          const data: AttachedThemeResponse[] = await response.json()
          setThemes(data)
        } else {
          const errorData: HttpErrorBody = await response.json()
          console.error(errorData.error || 'Ошибка при загрузке тем')
        }
      } catch (err) {
        console.error('Ошибка сети')
      }
    }

    fetchThemes()
  }, [])

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
          {themes.map(themeOption => (
            <MenuItem key={themeOption.id} value={themeOption.name}>
              {themeOption.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
