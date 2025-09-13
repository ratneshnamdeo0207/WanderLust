const Listing = require("./models/listing.js");

const Review = require("./models/review.js");

module.exports.isLoginIn = (req, res, next)=>{
    // console.log(req.path, "....", req.originalUrl)
    if(!req.isAuthenticated())
        {
            console.log("Not login")
            req.session.redirectUrl = req.originalUrl;
            console.log("url saved")
            console.log("Redirect Url: ",req.session.redirectUrl);
            req.flash("error", "You must login to create listing!")
            return res.redirect("/login");
        }
        next();
}
module.exports.saveRedirectUrl = (req, res, next)=>{
    console.log(1);
    console.log(req.session.redirectUrl)
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl;
        console.log("locals: ", res.locals.redirectUrl)
    }
    
    return next();
}
module.exports.isOwner = async(req, res, next)=>{
     let { id } = req.params;
        // console.log(req.body)
        // console.log(req.body.listing)
        let listing = await Listing.findById(id)
        if(!listing.owner._id.equals(res.locals.currUser._id))
        {
            req.flash("error", "You don't have any permission to edit this listing")
            return res.redirect(`/listings/${id}`) 
        }
        next();
}

module.exports.isReviewAuthor = async (req, res, next)=>{
    console.log("entering review author middleware")
    let {id, reviewId} = req.params;
    console.log(reviewId)
    let review = await Review.findById(reviewId);
    console.log(review)
    if(!review.author.equals(res.locals.currUser._id))
    {
        req.flash("error", "You dont have any permission to delete this review")
        return res.redirect(`/listings/${id}`)
    }
    next();
}