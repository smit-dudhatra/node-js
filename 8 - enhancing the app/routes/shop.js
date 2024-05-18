const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/cart", productsController.cart);

router.get("/products", productsController.getProducts);

router.get("/", productsController.index);

module.exports = router;
