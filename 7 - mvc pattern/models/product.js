const fs = require("fs");
const path = require("path");

const rootPath = require("../util/path");

const products = [];

const dataFileWithPath = path.join(rootPath, "data", "product.json");

const getProducts = (callbackFunction) => {
  fs.readFile(dataFileWithPath, (error, data) => {
    if (error) {
      callbackFunction([]);
    } else {
      callbackFunction(data.toString() ? JSON.parse(data) : []);
    }
  });
};

module.exports = class Product {
  constructor(productName) {
    this.title = productName;
  }

  save() {
    getProducts((products) => {
      products.push(this);

      fs.writeFile(dataFileWithPath, JSON.stringify(products), (error) => {
        if (error) console.log(error);
      });
    });
  }

  static fetchAll(callbackFunction) {
    getProducts(callbackFunction);
  }
};
