const express = require("express");
const { getAllProducts,createProduct, updateProduct, getProductDetails, deleteProduct } = require("../controllers/productController");

const router = express.Router();


router.route("/products").get(getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct).get(getProductDetails).delete(deleteProduct);

module.exports = router