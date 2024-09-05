const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//signup
router.route("/signup").get(userController.renderSignUpForm).post(wrapAsync(userController.signUp));
//login
router.route("/login").get(userController.renderLogInForm).post(saveRedirectUrl,passport.authenticate("local",{ failureRedirect: '/login',failureFlash:true}),userController.logIn);
//logout
router.get("/logout",userController.logOut);

module.exports = router;
