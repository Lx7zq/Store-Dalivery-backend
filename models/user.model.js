const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lat: {
    type: DataTypes.DECIMAL,
    allowNull: true, // ให้เป็น null ได้เพราะไม่ต้องการบังคับให้มีข้อมูลนี้
  },
  lng: {
    type: DataTypes.DECIMAL,
    allowNull: true, // ให้เป็น null ได้เช่นกัน
  },
});

module.exports = User;
