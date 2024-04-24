const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const {
  addProductValidation,
  editProductValidation,
} = require("../middleware/validators");

// admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  addProductValidation,
  adminController.postAddProducts
);

router.get("/edit-product/:productID", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  editProductValidation,
  adminController.postEditProduct
);

router.delete("/product/:productID", isAuth, adminController.deleteProductId);

module.exports = router;
