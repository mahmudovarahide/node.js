const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDB();
    let dbOP;
    if (this._id) {
      dbOP = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOP = db.collection("products").insertOne(this);
    }

    return dbOP
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((produts) => {
        console.log(produts);
        return produts;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodID) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodID) })
      .next()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodID) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodID) })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Product;
