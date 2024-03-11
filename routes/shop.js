const express = require("express");

const router = express.Router();

const productsController = require("../controllers/productController");

router.get("/", productsController.getShop);

module.exports = router;
