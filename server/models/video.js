const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descriere: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 255],
    },
  },
  titlu: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 255],
    },
  },
  url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Video;
