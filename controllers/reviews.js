const Review  = require("../models/review");
const Listing  = require("../models/listing");

module.exports.createReview = async(req,res,next)=>{
    let listing =   await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review has been added");
    res.redirect(`/listings/${req.params.id}`);
 };
 module.exports.destroyReview = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review has been deleted");
    res.redirect(`/listings/${id}`);
}