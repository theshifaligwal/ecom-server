const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getProductById, createProductById, getProduct, photo} = require("../controllers/product");
const { getUserById } = require("../controllers/user");

// all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

// all actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProductById
);


router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

module.exports = router;
