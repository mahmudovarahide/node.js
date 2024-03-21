const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProducts);

router.get("/edit-product/:productID", adminController.getEditProduct);

module.exports = router;
