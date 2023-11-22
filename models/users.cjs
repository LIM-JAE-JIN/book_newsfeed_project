'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
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
    const salyRoundKey = parseInt(process.env.SALT_ROUND_KEY);
    const hashedPasswd = await bcrypt.hash(user.password, salyRoundKey);
    user.password = hashedPasswd;
  });
  return Users;
};
