const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  IsAuthenticated,
  isAdmin,
  isAuthenticated,
} = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder ,getAllOrders} = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder,
  
);


// read
router.get("/order/all/:userId",
 isSignedIn, 
 isAuthenticated, 
 isAdmin, 
 getAllOrders
 )
// actual routes
module.exports = router;
