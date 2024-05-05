const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const handlebars = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  handlebars({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

app.set("view engine", "hbs");

// here we are using `hbs` because file extension are the .hbs
// if we use `handlebars` as extension then we will .handlebars
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Oops !!!" });
  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
