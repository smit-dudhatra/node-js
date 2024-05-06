const express = require("express");

const router = express.Router();

const names = [];

router.get("/users", (req, res, next) => {
  res.render("list", { pageTitle: "List", names: names });
});

router.post("/save", (req, res, next) => {
  names.push(req.body.name);
  res.redirect("/users");
});

exports.router = router;
exports.names = names;
