import { User, Theme } from '../models'

export const attachThemeToUser = async (userId: number, themeName: string) => {
  const theme = await Theme.findOne({ where: { name: themeName } })

  if (!theme) return null

  await User.upsert({
    id: userId,
    themeId: theme.id,
  })

  return theme
}

export const getThemeByUserId = async (userId: number) => {
  const user = await User.findByPk(userId, {
    include: 'theme',
  })

  if (!user) return null

  return user.theme
}
