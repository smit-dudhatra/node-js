const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  // the url will be fully mathched to "/" , instead it will be matched with the path that
  // starts with "/"
  // so it will execute for "/" and "/add-product" both
  // and hence it will be executed for all paths
  // because all path will start from "/"
  console.log(req.url);
  console.log(req.originalUrl);
  console.log("this always runs");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log(req.url);
  console.log(req.originalUrl);
  console.log("in the first middleware");
  res.end("<h1>This is add product page</h1>");
});

app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.originalUrl);
  console.log("in the next middleware");
  res.send("<h1>This is the Server Created By Express</h1>");

  //express middleware automatically set the content type based on the passed content
  // you can check this via documentation
});

app.listen(3000);
