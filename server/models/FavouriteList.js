const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Video = require('./video');

const FavouriteList = sequelize.define('FavouriteList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descriere: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255],
    },
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

FavouriteList.hasMany(Video,{onDelete:"CASCADE"})
module.exports = FavouriteList;
