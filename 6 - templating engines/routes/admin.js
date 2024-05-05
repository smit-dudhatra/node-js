const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const database = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  // console.log(req.body);
  database.push(req.body);
  res.redirect("/");
});

exports.router = router;
exports.database = database;
