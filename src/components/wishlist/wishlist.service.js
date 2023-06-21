const UserModel = require('../user/user.model')
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");


exports.addToWishlist = catchAsyncError(async (req, res, next) => {
    let user = await UserModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { wishlist: req.body.product }
    }, { new: true });
    !user && next(new AppError("User not found", 400));
    user && res.status(200).json({ msg: 'product added successfully', data: user.wishlist });
});


exports.deleteFromWishlist = catchAsyncError(async (req, res, next) => {
    let user = await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: req.body.product }
    });
    !user && next(new AppError("User not found", 400));
    user && res.status(200).json({ msg: 'product deleted successfully', data: user.wishlist });
});



exports.getUserWishlists = catchAsyncError(async (req, res) => {
    let { wishlist } = await UserModel.findById(req.user._id);
    res.status(200).json({ wishlist });
});




