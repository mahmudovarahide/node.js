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
    });
};

exports.getShop = (req, res) => {
  const prodID = req.params.productID;

  Product.findByPk(prodID)
    .then((products) => {
      res.render("shop/product-details", {
        product: products[0],
        pageTitle: products.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
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
    });
};

exports.getCard = (req, res) => {
  Card.getProducts((card) => {
    Product.fetchAll((products) => {
      const cardProducts = [];
      for (const prod of products) {
        const cardProductData = card.products.find(
          (prod) => prod.id === prod.id
        );
        if (cardProductData) {
          cardProducts.push({ productData: prod, qty: cardProductData });
        }
      }
      res.render("shop/card", {
        prods: cardProducts,
        pageTitle: "Your Card",
        path: "/card",
        products: cardProducts,
      });
    });
  });
};

exports.postCardDeleteProduct = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findByID(prodID, (product) => {
    if (product) {
      Card.deleteProductFromCard(prodID, product.price);
      res.redirect("/card");
    } else {
      next(new Error("Product not found"));
    }
  });
};

exports.postCard = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findByID(prodID, (product) => {
    if (product) {
      Card.addProduct(prodID, product.price);
      res.redirect("/card");
    } else {
      next(new Error("Product not found"));
    }
  });
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
