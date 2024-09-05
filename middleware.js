const Listing = require("./models/listing");
const Review = require("./models/review.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create or make change in a listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have the permission to  make change in this listing!");
       return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing =  (req,res,next)=>{
    let {error} =  listingSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }else{
        next();
    }
} 

 module.exports.validateReview =  (req,res,next)=>{
    let {error} =  reviewSchema.validate(req.body);
    if(error){
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }else{
        next();
    }
} 

module.exports.isAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You don't have the permission to  make change in this review!");
       return res.redirect(`/listings/${id}`);
    }
    next();
}
