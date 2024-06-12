const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
  // cart-item will be the key on evry relation
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;
