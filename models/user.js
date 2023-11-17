'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../utils/handlePassword');
const { signResetToken } = require('../utils/handleToken');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: {
          name: 'user_id'
        }
      });
    }
  }
  User.init({
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', hashPassword(value));
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      defaultValue: 'user',
      type: DataTypes.STRING,
    },
    resetToken: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.generateResetToken = function () {
    const resetToken = signResetToken(this.id);
    this.setDataValue('resetToken', resetToken);

    return resetToken;
  }

  return User;
};