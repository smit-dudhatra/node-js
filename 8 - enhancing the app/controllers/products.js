const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.cart = (req, res, next) => {
  res.render("shop/cart", { path: "/cart", pageTitle: "Cart" });
};

exports.products = (req, res, next) => {
  res.render("shop/product-list", {
    path: "/product-list",
    pageTitle: "Products",
  });
};

exports.index = (req, res, next) => {
  res.render("shop/index", {
    path: "index",
    pageTitle: "Index",
  });
};

exports.adminProducts = (req, res, next) => {
  res.render("admin/products", {
    pageTitle: "Admin Products",
    path: "admin/products",
  });
};
