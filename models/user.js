const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExp: Date,
  card: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCard = function (product) {
  if (!this.card) {
    this.card = { items: [] };
  }
  const cardProductIndex = this.card.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updateCardItems = [...this.card.items];
  console.log(updateCardItems);
  if (cardProductIndex >= 0) {
    newQuantity = this.card.items[cardProductIndex].quantity + 1;
    updateCardItems[cardProductIndex].quantity = newQuantity;
  } else {
    updateCardItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updateCard = {
    items: updateCardItems,
  };
  this.card = updateCard;
  return this.save();
};

userSchema.methods.deleteItemFromCard = function (productId) {
  const updateProducts = this.card.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.card.items = updateProducts;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
// const getDB = require("../util/database").getDB;
// const mongodb = require("mongodb");
// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, card, id) {
//     this.name = username;
//     this.email = email;
//     this.card = card;
//     this._id = id;
//   }
//   save() {
//     const db = getDB();
//     return db.collection("users").insertOne(this);
//   }

//   addToCard(product) {
//     if (!this.card) {
//       this.card = { items: [] };
//     }
//     const cardProductIndex = this.card.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updateCardItems = [...this.card.items];
//     console.log(updateCardItems);
//     if (cardProductIndex >= 0) {
//       newQuantity = this.card.items[cardProductIndex].quantity + 1;
//       updateCardItems[cardProductIndex].quantity = newQuantity;
//     } else {
//       updateCardItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }
//     const updateCard = {
//       items: updateCardItems,
//     };
//     const db = getDB();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { card: updateCard } }
//       );
//   }

//   getCard() {
//     const db = getDB();
//     const productsIds = this.card.items.map((e) => {
//       return e.productId;
//     });
//     return db
//       .collection("products")
//       .find({ _id: { $in: productsIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.card.items.find((i) => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   deleteItemFromCard(productId) {
//     const updateProducts = this.card.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDB();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { card: { items: updateProducts } } }
//       );
//   }

//   addOrder() {
//     const db = getDB();
//     const order = {
//       items: this.card.items,
//       user: {
//         _id: new ObjectId(this._id),
//         name: this.name,
//         name: this.email,
//       },
//     };
//     return db
//       .collection("orders")
//       .insertOne(this.card)
//       .then((result) => {
//         this.card = { items: [] };
//         return db
//           .collection("orders")
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { card: { items: [] } } }
//           );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(userId) {
//     const db = getDB();
//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) })
//       .then((users) => {
//         console.log(users);
//         return users;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;
