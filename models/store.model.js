const { DataTypes } = require("sequelize");
const sequelize = require("./db");


const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references: {
        model:"user",
        key: "id",
    }
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
  radius:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
});

Store.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating Financial Table", error);
  });

module.exports = Store;