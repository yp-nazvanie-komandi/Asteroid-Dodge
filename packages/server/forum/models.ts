import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
} from 'sequelize'

export class Topic extends Model<
  InferAttributes<Topic, { omit: 'comments' }>,
  InferCreationAttributes<Topic>
> {
  declare id: CreationOptional<number>
  declare title: string
  declare body: string
  declare author: string
  declare ownerId: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare comments?: NonAttribute<Comment[]>
  declare getComments: HasManyGetAssociationsMixin<Comment>
}

export class Comment extends Model<
  InferAttributes<Comment, { omit: 'replies' }>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<number>
  declare topicId: number
  declare author: string
  declare body: string
  declare ownerId: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare replies?: NonAttribute<Reply[]>
}

export class Reply extends Model<
  InferAttributes<Reply, { omit: 'reactions' }>,
  InferCreationAttributes<Reply>
> {
  declare id: CreationOptional<number>
  declare commentId: number
  declare author: string
  declare body: string
  declare ownerId: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare reactions?: NonAttribute<Reaction[]>
}

export class Reaction extends Model<
  InferAttributes<Reaction>,
  InferCreationAttributes<Reaction>
> {
  declare id: CreationOptional<number>
  declare replyId: number
  declare type: 'like' | 'dislike' | 'laugh' | 'sad' | 'angry'
  declare ownerId: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

export const initForumModels = (sequelize: Sequelize) => {
  Topic.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING(255), allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      author: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'NoBody',
      },
      ownerId: { type: DataTypes.STRING(128), allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'topics' }
  )

  Comment.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      topicId: { type: DataTypes.INTEGER, allowNull: false },
      author: { type: DataTypes.STRING(100), allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      ownerId: { type: DataTypes.STRING(128), allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'comments' }
  )

  Reply.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      commentId: { type: DataTypes.INTEGER, allowNull: false },
      author: { type: DataTypes.STRING(100), allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      ownerId: { type: DataTypes.STRING(128), allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'replies' }
  )

  Reaction.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      replyId: { type: DataTypes.INTEGER, allowNull: false },
      type: {
        type: DataTypes.ENUM('like', 'dislike', 'laugh', 'sad', 'angry'),
        allowNull: false,
      },
      ownerId: { type: DataTypes.STRING(128), allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'reactions' }
  )

  Topic.hasMany(Comment, {
    foreignKey: 'topicId',
    as: 'comments',
    onDelete: 'CASCADE',
  })
  Comment.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' })

  Comment.hasMany(Reply, {
    foreignKey: 'commentId',
    as: 'replies',
    onDelete: 'CASCADE',
  })
  Reply.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment' })

  Reply.hasMany(Reaction, {
    foreignKey: 'replyId',
    as: 'reactions',
    onDelete: 'CASCADE',
  })
  Reaction.belongsTo(Reply, { foreignKey: 'replyId', as: 'reply' })

  return { Topic, Comment, Reply, Reaction }
}
