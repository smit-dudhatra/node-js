const express = require("express");
const path = require("path");
const rootPath = require("../util/rootPath");

const router = express.Router();

// router.use("/", (req, res, next) => {

// the url will not be fully mathched to "/" , instead it will be matched with the path that
// starts with "/"
// so it will execute for "/" and "/add-product" both
// and hence it will be executed for all paths
// because all path will start from "/"

// next();
// });

router.get("/", (req, res, next) => {
  // res.send("<h1>This is the Server Created By Express</h1>");

  //express middleware automatically set the content type based on the passed content
  // you can check this via documentation
  // console.log(path.join(__dirname, "../", "views", "shop.html"));

  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));

  res.sendFile(path.join(rootPath, "views", "shop.html"));

  // we are using path function here
  // because it creates the path based on the system on which node is running on
  // because windows and linux have different path seperaters ..

  //in sendfile function
  //need to set the absolute path to the templatefile
});

module.exports = router;
