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
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const p = filePath("product.json");
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updateProduct = [...products];
        updateProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
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

  static deleteByID(id, callback) {
    getProductFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(filePath("product.json"), JSON.stringify(updatedProducts), (err) => {
        if (err) {
          console.log(err);
          return callback(false);
        }
        callback(true);
      });
    });
  }
};
