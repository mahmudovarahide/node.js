const Product = require("../models/products");
const Card = require("../models/card");

exports.getShops = (req, res) => {
  Product.findAll()
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

  Product.findByPk(prodID)
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
  Product.findAll()
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
    .then((card) => {
      return card
        .getProducts()
        .then((products) => {
          res.render("shop/card", {
            prods: products,
            pageTitle: "Your Card",
            path: "/card",
          });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .send("An error occurred while fetching card products.");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching user's card.");
    });
};

exports.postCard = (req, res, next) => {
  const prodID = req.body.productID;
  let fetchCard;
  req.user
    .getCard()
    .then((card) => {
      fetchCard = card;
      return card.getProducts({ where: { id: prodID } });
    })
    .then((products) => {
      let product;
      if (products.length) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        newQuantity = product.cardItem.quantity + 1;
      }
      return Product.findByPk(prodID)
        .then((product) => {
          return fetchCard.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .then(() => {
          res.redirect("/card");
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .send("An error occurred while adding product to card.");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred while fetching user's card.");
    });
};

exports.postCardDeleteProduct = (req, res, next) => {
  const prodID = req.body.productID;
  req.user
    .getCard()
    .then((card) => {
      return card.getProducts({ where: { id: prodID } });
    })
    .then((products) => {
      const product = products[0];
      return product.cardItem.destroy();
    })
    .then((result) => {
      res.redirect("/card");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("An error occurred while deleting product from card.");
    });
};

exports.postOrder = (req, res) => {
  req.user
    .getCard()
    .then((card) => {
      return card.getProducts();
    })
    .then((products) => {
      return req.user
        .createOder()
        .then((order) => {
          return order.addProduct(
            products.map((product) => {
              product.orderItem = { quantity: product.cardItem.quantity };
              return product;
            })
          );
        })
        .then((result) => {
          res.redirect("/orders");
        })
        .catch((err) => console.log(err));
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
