'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
require('dotenv').config();
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      introduce: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );

  Users.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(
      user.password,
      parseInt(process.env.SALT_ROUND_KEY),
    );
    user.password = hashedPassword;
  });
  return Users;
};
