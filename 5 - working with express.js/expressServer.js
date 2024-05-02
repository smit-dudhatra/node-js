// we will diffrentiate the import statements via 3 categories

// 1 >> core modules
// 2 >> third party modules
// 3 >> manual imports

const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopUrls = require("./routes/shop");
const rootPath = require("./util/rootPath");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootPath, "public")));

app.use("/admin", adminRoutes); // now the all the routes in adminRoutes file will have the `prefix /admin` by default
app.use(shopUrls);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootPath, "views", "404.html")); // we can chain any method and any number of method before send method, here we have added status method before sending the response
});

app.listen(3000);
