'use strict';
const { Model } = require('sequelize');
const { Users } = require('./index.cjs');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Posts.init(
    {
      postId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      genre: {
        type: DataTypes.ENUM('literature', 'essay', 'magazine', 'nonfiction'),
      },
      userId: {
        references: {
          model: Users,
          key: 'userId',
        },
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Posts',
    },
  );
  return Posts;
};
