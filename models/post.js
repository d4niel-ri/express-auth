'use strict';
const {
  Model
} = require('sequelize');
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
        foreignKey: {
          name: "user_id"
        }
      });
    }
  }
  Post.init({
    title: {
      allowNull: false,
      type: DataTypes.TEXT 
    },
    content: DataTypes.TEXT,
    user_id: DataTypes.NUMBER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};