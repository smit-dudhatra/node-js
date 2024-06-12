const Sequelize = require("sequelize");
const dbConnection = require("../util/database");

const Order = dbConnection.define("order", {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  totalAmount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
});

module.exports = Order;
