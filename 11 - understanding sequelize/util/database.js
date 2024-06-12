const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_tutorial", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  logging: console.log,
});

module.exports = sequelize;
