const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn, isAuthor}= require("../middleware.js");
const reviewController = require("../controllers/reviews.js")



//post a review 
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))

//delete a review
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.destroyReview))

 module.exports = router;