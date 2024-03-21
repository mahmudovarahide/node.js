const Product = require("../models/products");
const Card = require("../models/card");

exports.getShops = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/shop-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getShop = (req, res) => {
  const prodID = req.params.productID;
  Product.findByID(prodID, (product) => {
    res.render("shop/product-details", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { prods: products, pageTitle: "Shop", path: "/" });
  });
};

exports.getCard = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/card", {
      prods: products,
      pageTitle: "Your Card",
      path: "/card",
    });
  });
};

exports.postCard = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findByID(prodID, (product) => {
    Card.addProduct(prodID, product.price);
  });
  res.redirect("/card");
};

exports.getCheckout = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/checkout", {
      prods: products,
      pageTitle: "Your Checkout",
      path: "/checkout",
    });
  });
};
