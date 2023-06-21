const UserModel = require("./user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup = catchAsyncError(async (req, res, next) => {
    const isUser = await UserModel.findOne({ email: req.body.email })
    if (isUser) return next(new AppError("user already exists", 401));

    let User = new UserModel(req.body);
    await User.save();
    res.status(200).json(User);
});


exports.signin = catchAsyncError(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user || ! await bcrypt.compare(req.body.password, user.password))
        return next(new AppError("incorrect email or password", 401));

    let token = jwt.sign({ name: user.name, userId: user._id }, process.env.JWT_KEY);

    res.status(200).json({ token });
});

exports.ProtectedRoutes = catchAsyncError(async (req, res, next) => {
    //1) token provided or not
    let token = req.headers.token
    if (!token) return next(new AppError("token not provided", 401))
    //2) token valid or not
    let deocded = jwt.verify(token, process.env.JWT_KEY)

    //3 check if user exist or not
    let user = await UserModel.findById(deocded.userId);
    if (!user) return next(new AppError("user not found", 401));
    // change paswsord

    if (user.changedPasswordAt) {
        changedAt = parseInt(user.changedPasswordAt.getTime() / 1000)
        if (changedAt > deocded.iat)
            return next(new AppError("invalid token", 401));
    }

    req.user = user
    next()
})
//allowedTo('admin,'mngr','user,)
//['admin','mngr','user']
exports.allowedTo = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError("you are not authorized to access this route", 401));

        next()
    }

}
