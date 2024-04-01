const Product = require("../models/products");

exports.getShops = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/shop-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching products.");
    });
};

exports.getShop = (req, res) => {
  const prodID = req.params.productID;

  Product.findById(prodID)
    .then((product) => {
      if (product) {
        res.render("shop/product-details", {
          product: product,
          pageTitle: product.title,
          path: "/products",
        });
      } else {
        res.render("shop/product-details", {
          product: null,
          pageTitle: "Product Not Found",
          path: "/products",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching product details.");
    });
};

exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching products.");
    });
};

exports.getCard = (req, res) => {
  req.user
    .getCard()
    .then((products) => {
      res.render("shop/card", {
        prods: products,
        pageTitle: "Your Card",
        path: "/card",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching user's card.");
    });
};

exports.postCard = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findById(prodID)
    .then((product) => {
      return req.user.addToCard(product);
    })
    .then((result) => {
      res.redirect("/card");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCardDeleteProduct = (req, res, next) => {
  const prodID = req.body.productID;
  req.user
    .deleteItemFromCard(prodID)
    .then((result) => {
      res.redirect("/card");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res) => {
  req.user
    .addOrder()
    .then((card) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res) => {
  req.user
    .getCard()
    .then((card) => {
      return card.getProducts();
    })
    .then((products) => {
      res.render("shop/checkout", {
        prods: products,
        pageTitle: "Your Checkout",
        path: "/checkout",
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("An error occurred while fetching card products for checkout.");
    });
};
