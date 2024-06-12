const { fieldAttributeMap } = require("sequelize/lib/model");
const Product = require("../models/product");
const { mixinMethods } = require("sequelize/lib/associations/helpers");
const { INET } = require("sequelize/lib/data-types");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // there two approaches with which we can associate the foreign key field
  // 1 >> directly attach the user id on object and call the create method on it
  // 2 >> call magic method create<modelname> on the req param

  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
    .then((result) => {
      // console.log(result);
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.log(error);
    });

  // Product.create({
  //   title: title,
  //   imageUrl: imageUrl,
  //   price: price,
  //   description: description,
  //   userId : req.user.id
  // })
  //   .then((result) => {
  //     // console.log(result);
  //     res.redirect("/admin/products");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({
      where: {
        id: prodId,
      },
    })
    .then(([product]) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
      // we use promise chaining instead of nesting the promises
      // by returning the promise we are chaining the promise
    })
    .then(() => {
      console.log("Product Updated");
      res.redirect("/admin/products");
    });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log("Product DESTROYED");
      res.redirect("/admin/products");
    });
};
