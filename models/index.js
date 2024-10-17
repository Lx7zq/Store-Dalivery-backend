const sequelize = require("./db");
const Sequelize = require("sequelize");
const Store = require("./store.model");
const User = require("./user.model");
const Role = require("./role.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;
db.Store = Store;

// Association between User and Role
db.User.belongsToMany(db.Role, {
  through: "user_roles",
  foreignKey: "userId",
});
db.Role.belongsToMany(db.User, {
  through: "user_roles",
  foreignKey: "roleId",
});

// Association between User and Store
db.User.hasMany(db.Store, {
  foreignKey: "adminId",
});
db.Store.belongsTo(db.User, {
  foreignKey: "adminId",
});

module.exports = db;
