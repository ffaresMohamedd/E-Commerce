const UserModel = require('../user/user.model')
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");


exports.addAddress = catchAsyncError(async (req, res, next) => {
    let user = await UserModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { addresses: req.body }
    }, { new: true });
    !user && next(new AppError("User not found", 400));
    user && res.status(200).json({ msg: 'Address added successfully', data: user.addresses });
});


exports.deleteAddress = catchAsyncError(async (req, res, next) => {
    let user = await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { addresses: { _id: req.body.address } }
    });
    !user && next(new AppError("User not found", 400));
    user && res.status(200).json({ msg: 'address deleted successfully', data: user.addresses });
});



exports.getUserAddresses = catchAsyncError(async (req, res) => {
    let { addresses } = await UserModel.findById(req.user._id);
    res.status(200).json({ addresses });
});




