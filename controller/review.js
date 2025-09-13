const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.newReview = async (req, res)=>{
    console.log("entering post route for review");
    console.log(req.params)
    let listing = await Listing.findById(req.params.id);
    console.log(listing);
    console.log(req.body.review)
    let newReview = new Review(req.body.review);
    newReview.author = req.user;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("New Review Saved");
    // res.send("New REview SAved")
    req.flash("success", "Review Created")
    res.redirect(`/listings/${listing.id}`)
};

module.exports.destroyReview = async(req, res)=>{
    console.log("Enter in route")
    let {id, reviewId} = req.params;
    console.log(id);
    console.log(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`);
};