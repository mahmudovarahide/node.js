const Product = require("../models/products");

exports.addProduct = (title, imageUrl, price, description, userId) => {
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: userId,
  });
  return product.save();
};

exports.productById = (prodID) => {
  return Product.findById(prodID);
};

exports.updateProduct = (prodID, updateData, userId) => {
  return Product.findById(prodID).then((product) => {
    if (product.userId.toString() !== userId.toString()) {
      throw new Error("Not authorized");
    }
    Object.assign(product, updateData);
    return product.save();
  });
};

exports.getProductsByUserId = (userId) => {
  return Product.find({ userId: userId });
};

exports.deleteProductById = (prodID, userId) => {
  return Product.findOneAndDelete({ _id: prodID, userId: userId });
};
