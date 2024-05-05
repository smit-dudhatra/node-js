const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  res.render("shop", {
    prods: adminData.products,
    pageTitle: "Home Page",
    url: "/",
  }); // give path to the template file as you are in the views folder
});

module.exports = router;
