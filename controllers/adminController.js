const { validationResult } = require("express-validator");
const adminServices = require("../services/adminService");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: null,
    oldInput: {
      title: "",
      imageUrl: "",
      price: "",
      description: "",
    },
  });
};

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user._id;
  const errors = validationResult(req);

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      product: {
        title: title,
        price: price,
        description: description,
      },
      errorMessage: "Attached file is not an image",
      oldInput: {
        title: title,
        price: price,
        description: description,
      },
    });
  }

  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      product: {
        title: title,
        imageUrl: image.path,
        price: price,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      oldInput: {
        title: title,
        price: price,
        description: description,
      },
    });
  }

  const imageUrl = image.path;

  adminServices
    .addProduct(title, imageUrl, price, description, userId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
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
        errorMessage: null,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productID;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateDescription = req.body.description;
  const updateImageUrl = req.body.imageUrl;
  if (!prodID) {
    return res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: {
        title: updateTitle,
        imageUrl: updateImageUrl,
        price: updatePrice,
        description: updateDescription,
      },
      errorMessage: "Invalid product ID",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: {
        title: updateTitle,
        imageUrl: updateImageUrl,
        price: updatePrice,
        description: updateDescription,
      },
      errorMessage: errors.array()[0].msg,
    });
  }

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
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(err);
    });
};

exports.getProducts = (req, res, next) => {
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
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(err);
    });
};

exports.deleteProductId = (req, res) => {
  const prodID = req.params.productID;
  const userId = req.user._id;
  adminServices
    .deleteProductById(prodID, userId)
    .then(() => {
      // res.redirect("/admin/products");
      res.status(200).json({ message: "Success!" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Deleting product failed!" })
    );
};
