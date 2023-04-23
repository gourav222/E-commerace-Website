const user = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncFuctions = require("../middleware/catchAsyncFunction");
const sendToken = require("../utils/jwtTokenAuthentication");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//user routes
exports.registerUser = catchAsyncFuctions(async (req, res, next) => {
  const { name, email, password } = req.body;
  const users = await user.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample",
      url: "profile photo",
    },
  });
  sendToken(users, 201, res);
});

exports.loginUser = catchAsyncFuctions(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter the email and password", 400));

  const users = await user.findOne({ email }).select("+password");

  if (!users)
    return next(
      new ErrorHandler("Please enter a valid email or password", 401)
    );

  const isPasswordMatched = await users.comparePassword(password);

  if (!isPasswordMatched)
    return next(
      new ErrorHandler("Please enter a valid email or password", 401)
    );

  sendToken(users, 200, res);
});

exports.logoutUser = catchAsyncFuctions(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Success",
  });
});

exports.forgotPassword = catchAsyncFuctions(async (req, res, next) => {
  const users = await user.findOne({ email: req.body.email });

  if (!users) return next(new ErrorHandler("User not found", 404));

  const resetToken = users.getResetPasswordToken();

  await users.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not request this mail please, ignore it.`;

  try {
    await sendEmail({
      email: users.email,
      subject: `Password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${users.email} successfully`,
    });
  } catch {
    users.resetPasswordToken = undefined;
    users.resetPasswordExpire = undefined;
    await users.save({ validateBeforeSave: false });
  }
});

exports.resetPassword = catchAsyncFuctions(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const users = await user.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!users)
    return next(
      new ErrorHandler(`Reset password token is invalid or expires`, 400)
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler(`Password does not match`, 400));

  users.password = req.body.password;
  users.resetPasswordToken = undefined;
  users.resetPasswordExpire = undefined;

  await users.save();

  sendToken(users, 200, res);
});

exports.getUserDetails = catchAsyncFuctions(async (req, res, next) => {
  const users = await user.findById(req.user.id);

  res.status(200).json({
    success: true,
    users,
  });
});

exports.changePassword = catchAsyncFuctions(async (req, res, next) => {
  const users = await user.findById(req.user.id).select("+password");

  const isPasswordMatched = await users.comparePassword(
    req.body.currentPassword
  );

  if (!isPasswordMatched)
    return next(
      new ErrorHandler("Please enter a valid email or password", 401)
    );

  if (req.body.newPassword != req.body.confirmPassword)
    return next(new ErrorHandler("Passowrd doen not match", 401));

  users.password = req.body.newPassword;

  await users.save();

  sendToken(users, 200, res);
});

exports.updateUserProfile = catchAsyncFuctions(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const users = await user.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    users,
  });
});

//get all users(admin route)
exports.getAllUsers = catchAsyncFuctions(async (req, res, next) => {
  const users = await user.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user(admin route)
exports.getSingleUser = catchAsyncFuctions(async (req, res, next) => {
  const users = await user.findById(req.params.id);

  if (!users) return next(new ErrorHandler("User does not exists", 400));

  res.status(200).json({
    success: true,
    users,
  });
});

//update role of any particular user admin route
exports.updateRoleOfUser = catchAsyncFuctions(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const users = await user.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!users) return next(new ErrorHandler("User does not exists", 400));

  res.status(200).json({
    success: true,
    users,
  });
});

//Remove any specific user admin route
exports.deleteUser = catchAsyncFuctions(async (req, res, next) => {
  const users = await user.findById(req.params.id);

  if (!users) return next(new ErrorHandler("User does not exists", 400));

  await users.remove();

  res.status(200).json({
    success: true,
    message: "User has been deleted successfully",
  });
});
