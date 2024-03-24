const path = require("path");
const fs = require("fs");

const filePath = () => {
  return path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "card.json"
  );
};

module.exports = class Card {
  static addProduct(id, productPrice) {
    fs.readFile(filePath(), (err, fileContent) => {
      let card = { products: [], totalPrice: 0 };
      if (!err) {
        card = JSON.parse(fileContent);
      }

      card.products = Array.isArray(card.products) ? card.products : [];

      const existingProductIndex = card.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = card.products[existingProductIndex];
      let updateProduct;
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.quantity = updateProduct.quantity + 1;
        card.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, quantity: 1 };
        card.products.push(updateProduct);
      }
      card.totalPrice = productPrice + productPrice;
      fs.writeFile(filePath(), JSON.stringify(card), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProductFromCard(id, productPrice) {
    fs.readFile(filePath(), (err, fileContent) => {
      if (err) {
        return err;
      }
      let updateCard = { ...JSON.parse(fileContent) };
      const product = updateCard.products.find((prod) => prod.id === id);
      console.log(product)

      updateCard.products = updateCard.products.filter(
        (prod) => prod.id !== id
      );
      // const productQty = product.quantity;
      updateCard.totalPrice = updateCard.totalPrice - productPrice ;
      fs.writeFile(filePath(), JSON.stringify(updateCard), (err) => {
        console.log(err);
      });
    });
  }
  static getProducts(callback) {
    fs.readFile(filePath(), (err, fileContent) => {
      const card = JSON.parse(fileContent);
      if (err) {
        return callback(null);
      } else {
        callback(card);
      }
    });
  }
};
