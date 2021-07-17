const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getProductById, createProductById } = require("../controllers/product");
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

module.exports = router;
