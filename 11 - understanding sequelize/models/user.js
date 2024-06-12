const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = User;
