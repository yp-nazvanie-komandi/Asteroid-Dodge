import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from 'sequelize'

export class Theme extends Model<
  InferAttributes<Theme, { omit: 'users' }>,
  InferCreationAttributes<Theme>
> {
  declare id: CreationOptional<number>

  declare name: string

  declare users?: NonAttribute<User[]>
}

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>

  declare themeId: number

  declare theme?: NonAttribute<Theme>
}

export const initThemeModels = (sequelize: Sequelize) => {
  Theme.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    },
    { sequelize, tableName: 'theme' },
  )

  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      themeId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, tableName: 'user' },
  )

  Theme.hasMany(User, {
    foreignKey: 'themeId',
    as: 'user',
    onDelete: 'CASCADE',
  })

  User.belongsTo(Theme, { foreignKey: 'themeId', as: 'theme' })

  return { Theme, User }
}
