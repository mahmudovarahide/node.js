const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shopController");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getShops);

router.get("/products/:productID", shopController.getShop);

router.get("/card", shopController.getCard);

router.post("/card", shopController.postCard);

router.get("/checkout", shopController.getCheckout);

router.post("/card-delete-btn", shopController.postCardDeleteProduct);

module.exports = router;
