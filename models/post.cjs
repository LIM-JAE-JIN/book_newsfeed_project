'use strict';
const { Model } = require('sequelize');
import { User } from './index.cjs';
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Post.init(
    {
      postId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      genre: DataTypes.STRING,
      userId: {
        references: {
          model: User,
          key: 'userId',
        },
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
