const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFunction = require("./catchAsyncFunction");
const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");
exports.isAuthenticatonUser = catchAsyncFunction(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler("Please login to access this resource", 401));

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  // console.log(decodeData);
  // console.log(token);

  req.user = await users.findById(decodeData.id);

  next();
});
exports.authorizeRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
