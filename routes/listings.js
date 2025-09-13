require('dotenv').config();
console.log(process.env)

const express = require("express")
Router = express.Router()

const CustomError = require("../utils/CustomError.js");
const Listing = require("../models/listing.js");
const {listingSchema} = require("../scheme")
const asyncWrap = require("../utils/asyncWrap.js")
const validateListing = require("../utils/validateListing.js")
const {isLoginIn, saveRedirectUrl, isOwner} = require("../middleware.js")
const listingController = require("../controller/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

Router.route("/")
    .get(asyncWrap(listingController.index))
    .post(isLoginIn, upload.single("listing[image]"), validateListing, asyncWrap(listingController.newListing));
   

Router.get("/new", isLoginIn, listingController.renderNewForm);

Router.route("/:id")
    .get( asyncWrap(listingController.showListing))
    .delete( isLoginIn, isOwner, asyncWrap(listingController.destroyListing))
    .put( isLoginIn, isOwner, upload.single("listing[image]"), validateListing, asyncWrap(listingController.updateListing));

Router.get("/:id/edit", isLoginIn,isOwner, asyncWrap(listingController.renderEditform));







module.exports = Router;