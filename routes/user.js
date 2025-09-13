const express = require("express");
Router = express.Router();
const User = require("../models/user.js");
const asyncWrap = require("../utils/asyncWrap.js")
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js")

Router.route("/signup")
    .get( userController.renderSignupForm)
    .post( asyncWrap(userController.signup));

Router.route("/login")
    .get( userController.renderLoginForm)
    .post( saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

Router.get("/logout", userController.logout)


module.exports = Router;