// [SECTION] Dependencies and Modules
const express = require("express");

const userController = require("../controllers/user");
const passport = require("passport");
//const { verify } = require("../auth"); 
const { verify, verifyAdmin, isLoggedIn } = require("../auth");

// [SECTION] Routing Component
const router = express.Router();

// [SECTION] Routes
router.post("/checkEmail", userController.checkEmailExists);

router.get("/all", verify, verifyAdmin, userController.getAllUsers);

router.post("/register", userController.registerUser);


module.exports = router;

