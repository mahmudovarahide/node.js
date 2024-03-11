const Product = require("../models/products");
exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
exports.postAddProducts = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getShop = (req, res, next) => {
  const products = Product.fetchAll();

  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
};
