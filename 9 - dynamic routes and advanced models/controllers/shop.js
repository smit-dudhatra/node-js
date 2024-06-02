const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getDetails = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id, (product) => {
    console.log(product);
    res.render("shop/product-detail", {
      path: "product-detail",
      pageTitle: "Product Detail",
      product: product,
    });
  });
  // res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((items) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      prods: items,
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });

  res.redirect("/");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.deleteItemFromCart = (req, res, next) => {
  const productId = req.query.productId;

  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price, () => {
      res.redirect("/cart");
    });
  });
};
