const express = require("express")
const router = express.Router();
const {isSignedIn, IsAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user");
const { updateStock } = require("../controllers/product")



const {} = require("../controllers/order")