const express = require("express");

const productsController = require("../controllers/productController");

const router = express.Router();

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProducts);

module.exports = router;
