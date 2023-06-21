const ReviewModel = require("./reviews.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const factory = require('../Handlers/handler.factory')

// to add new Review
exports.createReview = catchAsyncError(async (req, res, next) => {
    let isReview = await ReviewModel.findOne({ user: req.body.user, product: req.body.product })
    if (isReview) return next(new AppError('your are created a review before'))
    let Review = new ReviewModel(req.body);
    await Review.save();
    res.status(200).json(Review);
});

// to get all Reviews
exports.getReviews = catchAsyncError(async (req, res) => {
    let Reviews = await ReviewModel.find({});
    res.status(200).json(Reviews);
});

// to get specific Review
exports.getReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let Review = await ReviewModel.findById(id)
    !Review && next(new AppError("Review not found", 400));
    Review && res.status(200).json(Review);
});

// to update specific Review
exports.updateReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let isReview = await ReviewModel.findById(id)
    if (isReview.user._id != req.body.user) 
        return next(new AppError("you don't have a permission", 400));

    let Review = await ReviewModel.findByIdAndUpdate(id, req.body, { new: true });
    !Review && next(new AppError("Review not found", 400));
    Review && res.status(200).json(Review);
});

// to delete specific Review
exports.deleteReview = factory.deleteOne(ReviewModel)
