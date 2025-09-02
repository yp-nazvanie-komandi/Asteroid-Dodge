import { Op } from 'sequelize'

import { Theme } from '../models'

export const getAllThemes = async () => {
  return await Theme.findAll()
}

export const getThemesByName = async (name: string) => {
  return await Theme.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
}
