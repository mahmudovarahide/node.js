const path = require("path");
const fs = require("fs");

const filePath = (fileName) => {
  return path.join(path.dirname(process.mainModule.filename), "data", fileName);
};

const getProductFromFile = (callback) => {
  const p = filePath("product.json");
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Products {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    getProductFromFile((products) => {
      products.push(this);
      const p = filePath("product.json");
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductFromFile(callback);
  }

  static findByID(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((item) => item.id === id);
      callback(product);
    });
  }
};
