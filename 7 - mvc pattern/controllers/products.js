const Product = require("../models/product");

exports.productForm = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.saveProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};
