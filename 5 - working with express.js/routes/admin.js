const express = require("express");
const path = require("path");

const router = express.Router();

const rootPath = require("../util/rootPath");

router.use("/add-product", (req, res, next) => {
  // if you use app.get or app.post it will take care of two things => request method and request url

  // this middleware will take care of the /add-product url only , not compitible for /add-product-abc and /add-productssss
  // but this middleware will accept the /add-product/xyz url
  // res.send(
  //   "<form method='POST' action='/admin/save-product'><input type='text' name='username'><button type='submit'>Submit</button></form>"
  // );

  //we can also write like this

  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));

  // because it doesn't matter on which system the code is currently running on
  // since ../ and .. are same when we moving backward to file
  // console.log(rootPath);
  res.sendFile(path.join(rootPath, "views", "add-product.html"));

  // __dirname will return the current directory name with absolute path
  // __filename will return the absolute path to the current file from root of the disk
});

router.post("/save-product", (req, res, next) => {
  // if we use app.use it will accept all the requests
  // so for specific type of http requests
  // use app.post or app.patch etc....
  console.log(req.body);
  res.redirect("/");

  // we can't send the response after redirect
});

module.exports = router;
