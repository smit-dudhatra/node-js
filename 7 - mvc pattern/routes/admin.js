const path = require("path");

const express = require("express");

const productController = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productController.productForm);

// /admin/add-product => POST
router.post("/add-product", productController.saveProduct);

module.exports = router;
