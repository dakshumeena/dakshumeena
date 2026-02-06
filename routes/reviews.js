const express=require("express");
const router=express.Router()
const catchAsync=require('../utils/catchAsync');
const ExpressError=require('../utils/ExpressError')

const {campgroundSchema,reviewSchema  }=require('../schemas.js')
const {isLoggedIn,validateReview,isReviewAuthor}=require('../middleware')
const reviews=require('../controllers/reviews')


router.post('/:id/reviews',isLoggedIn,validateReview,catchAsync(reviews.createReview))
router.delete('/:id/reviews/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))
module.exports=router
