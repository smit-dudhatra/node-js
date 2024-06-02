const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:id", shopController.getDetails);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.addToCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

router.get("/delete-cart-item", shopController.deleteItemFromCart);

module.exports = router;
