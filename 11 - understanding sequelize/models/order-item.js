const Sequelize = require("sequelize");

const dbConnection = require("../util/database");

const OrderItem = dbConnection.define("orderItem", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderItem;
