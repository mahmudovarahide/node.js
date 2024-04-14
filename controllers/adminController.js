const adminServices = require("../services/adminService");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProducts = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user._id;

  adminServices
    .addProduct(title, imageUrl, price, description, userId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodID = req.params.productID;
  adminServices
    .productById(prodID)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: true,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productID;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;
  const updateImageUrl = req.body.imageUrl;

  adminServices
    .updateProduct(
      prodID,
      {
        title: updateTitle,
        price: updatePrice,
        description: updateDescription,
        imageUrl: updateImageUrl,
      },
      req.user._id
    )
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  const userId = req.user._id; 
  adminServices
    .getProductsByUserId(userId)
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "admin/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res) => {
  const prodID = req.body.productID;
  const userId = req.user._id;
  adminServices
    .deleteProductById(prodID, userId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
