const express = require("express");
const { getAllProducts,createProduct, updateProduct, getProductDetails, deleteProduct } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/products").get( getAllProducts);

router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin "), createProduct);

router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin "),updateProduct)
.get(getProductDetails).delete(isAuthenticatedUser, authorizeRoles("admin "),deleteProduct);

module.exports = router