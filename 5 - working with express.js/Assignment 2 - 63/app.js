const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  // you can ommit the third argument if you not forwarding the request to another middleware

  console.log(req.originalUrl);

  res.send("<h1>User List</h1>");
});

app.use("/", (req, res, next) => {
  console.log(req.originalUrl);
  res.send("<h1>Root URL</h1>");
});

app.listen(3000);
