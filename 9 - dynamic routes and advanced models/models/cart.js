const fs = require("fs");
const path = require("path");

const homePath = require("../util/path");

const cartFilePath = path.join(homePath, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartFilePath, (error, data) => {
      let cart = { products: [], totalPrice: 0 }; // products array will carry id and quntity object

      if (!error) {
        if (data.toString()) {
          cart = JSON.parse(data.toString());
        }
      }

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id == id
      );

      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(cartFilePath, JSON.stringify(cart), (error) => {
        if (error) {
          console.log("Cart Writing Error", error);
        }
      });
    });
  }

  static deleteProduct(id, productPrice, callback) {
    fs.readFile(cartFilePath, (error, data) => {
      const cartItems = data.toString();

      if (cartItems) {
        const cartData = JSON.parse(cartItems);

        const updatedProducts = cartData["products"].filter(
          (prod) => prod.id != id
        );
        const deletedProduct = cartData["products"].filter(
          (prod) => prod.id == id
        );
        const newCartTotal =
          cartData.totalPrice - deletedProduct.qty * +productPrice;

        const newCartData = {
          products: updatedProducts,
          totalPrice: newCartTotal,
        };

        fs.writeFile(cartFilePath, JSON.stringify(newCartData), (error) => {
          if (error) {
            console.log("Error While Deleting The Product", error);
          } else {
            callback();
          }
        });
      } else {
        cb();
      }
    });
  }

  static getCart(cb) {
    fs.readFile(cartFilePath, (err, data) => {
      const cartData = data.toString();

      cb(cartData ? JSON.parse(cartData) : []);
    });
  }
};
