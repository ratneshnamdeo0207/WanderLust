const express = require("express")
const CustomError = require("../utils/CustomError.js");
Router = express.Router({mergeParams: true})
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { reviewSchema} = require("../scheme.js")
const asyncWrap = require("../utils/asyncWrap.js")
const validateReview = require("../utils/validateReview.js");
const {isLoginIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/review.js")

// function asyncWrap( fn)
// {
//     return function fun(req, res, next)
//     {
//         fn(req, res, next).catch((err)=> next(err))
//     }
// }


// function validateReview(req, res, next){
//     console.log("Erroring")
//     // console.log(req.body)
//     let {error} = reviewSchema.validate(req.body)
    
//     if(error){
//          errMsg = error.details.map((el)=> el.message).join(",");
//         throw new CustomError(400, errMsg)
//         console.log("error: ", error)
//     }
//     next()
// }

Router.post("/", isLoginIn, validateReview, asyncWrap(reviewController.newReview))

Router.delete("/:reviewId", isLoginIn, isReviewAuthor, asyncWrap(reviewController.destroyReview)) 

module.exports = Router;
