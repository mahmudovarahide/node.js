const Product = require("../models/products");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodID = req.params.productID;
  Product.findByID(prodID, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productID;
  const updateTitle = req.body.title;
  const updateImageUrl = req.body.imageUrl;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;
  const updateProduct = new Product(
    prodID,
    updateTitle,
    updateImageUrl,
    updatePrice,
    updateDescription
  );
  updateProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "admin/products",
    });
  });
};

exports.deleteProduct = (req, res) => {
  const prodID = req.body.productID;
  Product.deleteByID(prodID);
  res.redirect("/admin/products");
};
