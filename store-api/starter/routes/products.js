const express = require("express");

const router = express.Router();

const {
  createProducts,
  getProductsStatic,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.route("/static").get(getProductsStatic);
router.route("/").get(getProducts).post(createProducts);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
