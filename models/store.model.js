const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // เปลี่ยนจาก "User" เป็น "Users" (ชื่อของตารางใน PostgreSQL)
      key: "id",
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  lng: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  radius: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Store.sync({ force: false })
  .then(() => {
    console.log("Store table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating Store table", error);
  });

module.exports = Store;
