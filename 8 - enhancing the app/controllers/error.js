exports.get404 = (req, res, next) => {
  // console.log("this always runs for every request that don't get any exact match like
  // serviceworker.js and favicon.ico");
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};
