const express = require("express")
const router = express.Router();
const {isSignedIn, IsAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user");
const { updateStock } = require("../controllers/product")



const {getOrderById} = require("../controllers/order")


// params
router.param("userId", getUserById)
router.param("orderId", getOrderById)


// create
// read

// actual routes
module.exports = router;

