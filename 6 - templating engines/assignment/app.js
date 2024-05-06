const express = require("express");
const bodyParser = require("body-parser");

const userData = require("./routes/user");
const homeRoutes = require("./routes/home");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(userData.router);
app.use(homeRoutes);

app.use((req, res, next) => {
  res.render("404", { pageTitle: "404" });
});

app.listen(3000, (error) => {
  if (error) console.log(error);
  console.log("Started Listening");
});
