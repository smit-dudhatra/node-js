const Product = require("../models/product");
const Cart = require("../models/cart");
const { where, or } = require("sequelize");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

  // Product.findAll({ where: { id: prodId } }).then((product) => {});
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      // console.log("51", products);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart = null;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      // console.log("76", products);
      if (products.length > 0) {
        product = products[0];
      }
      // console.log("80", product);
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantity,
        },
      });
    })
    .catch((error) => {
      console.log("Error While adding product to cart", error);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));

  // Product.findByPk(prodId)
  //   .then((product) => {
  //     Cart.addProduct(prodId, product.price);
  //     res.redirect("/cart");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user
    .getCart((cart) => {
      return cart.getProduct({ where: { id: prodId } });
    })
    .then((product) => {
      const productToBeDelete = product[0];
      return productToBeDelete.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  let fetchedProducts;
  let cartTotal = 0;
  let createdOrder;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      fetchedProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      createdOrder = order;
      return order.addProducts(
        fetchedProducts.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          cartTotal += product.cartItem.quantity * product.price;
          return product;
        })
      );
    })
    .then((order) => {
      createdOrder.totalAmount = cartTotal;
      return createdOrder.save();
    })
    .then((order) => {
      return fetchedCart.setProducts(null);
    })
    .then((fetchedCart) => {
      res.redirect("/orders");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
