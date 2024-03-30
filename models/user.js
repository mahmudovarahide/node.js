const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, card, id) {
    this.name = username;
    this.email = email;
    this.card = card;
    this._id = id;
  }
  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  static addToCard(product) {
    // const cardProduct = this.card.items.findIndex((cp) => {
    //   return cp._id === product._id;
    // });
    const updateCard = { items: [{ ...product, quantity: 1 }] };
    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { card: updateCard } }
      );
  }

  static findById(userId) {
    const db = getDB();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((users) => {
        console.log(users);
        return users;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
