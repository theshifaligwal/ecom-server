const express = require("express");
const router = express.Router();

//Controllers
const { getUserById, getUser, updateUser } = require("../controllers/user");

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// router.get("/users", getAllUsers)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)

module.exports = router;