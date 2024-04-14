const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const isAuth = require("../middleware/is-auth");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getShops);

router.get("/products/:productID", shopController.getShop);

router.get("/card", isAuth, shopController.getCard);

router.post("/card", isAuth, shopController.postCard);

// // router.get("/checkout", isAuth, shopController.getCheckout);

// router.post("/create-order", isAuth, shopController.postOrder);

// router.get("/orders", isAuth, shopController.getOrders);

router.post("/card-delete-btn", isAuth, shopController.postCardDeleteProduct);

module.exports = router;
