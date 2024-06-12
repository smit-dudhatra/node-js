const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");
const Product = require("./models/product");
const CartItem = require("./models/cart-items");
const Cart = require("./models/cart");
const order = require("./models/order");
const Order = require("./models/order");
const orderItem = require("./models/order-item");
const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); // this is not necessary but to make it really clear the two way relation

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.hasOne(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// force : true is only for development environment
// because it will always re-create the record on restart of nodemon server

sequelize
  // .sync({ force: true })

  .sync()
  .then((result) => {
    // console.log(result);

    User.findByPk(1)
      .then((user) => {
        if (!user) {
          return User.create({
            name: "Demo User",
            email: "demo@email.com",
          });
        }
        return user;
      })
      .then((user) => {
        // console.log(user);
        user.getCart().then((cart) => {
          if (!cart) {
            return user.createCart();
          }
          return cart;
        });
      })
      .then((cart) => {
        app.listen(3000);
      })

      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
