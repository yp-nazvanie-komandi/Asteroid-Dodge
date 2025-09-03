import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useAuth } from '../../hooks/Auth/useAuth'
import {
  useGetApiV1ThemesQuery,
  usePostApiV1UsersThemeMutation,
} from '../../redux/api/AsteroidDodge/enhanced/api'

import './style.scss'

// Интерфейс для пропсов компонента
interface IChangeThemeDropProps {
  currentTheme: string
  onChange: (themeName: string) => void
}

export default function ChangeThemeDrop({
  currentTheme,
  onChange,
}: IChangeThemeDropProps) {
  const { isAuthenticated } = useAuth()
  const [updateTheme] = usePostApiV1UsersThemeMutation()
  // Будет лежать в кэше ртк из-за SSRа
  const {
    data: themes = [],
    isError,
    isFetching,
    isLoading,
  } = useGetApiV1ThemesQuery({})

  const handleChange = async (event: SelectChangeEvent) => {
    onChange(event.target.value)
    document.cookie = `theme=${event.target.value}; path=/`

    if (isAuthenticated && (__API_MODE__ === 'ssr' || import.meta.env.SSR)) {
      // Если пользователь авторизован, и мы находимся в SSR отправляем на сервер
      updateTheme({
        attachThemeRequest: { themeName: event.target.value },
      })
    }
  }

  // Если бэк не отвечает, чаще всего его просто забудут включить, не показываем ничего (или если тем в бд нет, то тоже нечего показывать)
  if (isError || isFetching || isLoading || !themes.length) {
    return null
  }

  return (
    <div className="theme">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Тема</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currentTheme}
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
