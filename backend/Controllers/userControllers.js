const asyncErrorHandler = require("../utils/asyncErrorHandler");
const User = require("../database/Models/userSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register a user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  //cloudinary
  const avatarCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "starmart_ecommerce_user_avatar",
    width: 150,
    crop: "scale",
  });

  const user = new User({
    name,
    email,
    password,
    avatar: {
      public_id: avatarCloud.public_id,
      url: avatarCloud.secure_url,
    },
  });

  //hashing pw in userSchema.js

  await user.save();

  //to get our token & storing it inside the cookie
  const token = user.generateToken();

  res.cookie("logintoken", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), //days to ms
  });

  //to send a welcome email

  await sendEmail(
    {
      email: req.body.email,
      subject: "Welcome On Board!",
      name: req.body.name,
      message: "Welcome on Board!",
    },
    "register"
  );

  res
    .status(201)
    .json({ message: "User Created!", success: true, user, token });
});

//loging in a user
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Login Details", 401));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Login Details", 401));
  }

  const token = user.generateToken();

  res.cookie("logintoken", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), //days to ms
  });

  res.status(201).json({
    message: "User Logged in successfully",
    success: true,
    user,
    token,
  });
});

//to log out
exports.loggingOutUser = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("logintoken", { path: "/" });

  res.status(200).json({ success: true, message: "Logged Out!" });
});

//to get logged in user's details
exports.loggedInUser = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

//update logged in user
exports.updateUser = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  //cloudinary
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    //delete previous image
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    //upload new image
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "starmart_ecommerce_user_avatar",
      width: 150,
      crop: "scale",
    });

    //adding image data inside newUserData object
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
  });

  res.status(200).json({ success: true, message: "User Updated" });
});

//delete logged in user
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  res.status(200).json({ success: true, message: "Profile Deleted" });
});

//update user password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("new password & confirm password do not match", 400)
    );
  }

  if (newPassword === oldPassword) {
    return next(
      new ErrorHandler("new password cannot be your old password", 400)
    );
  }

  user.password = newPassword;

  //password will be hashed

  await user.save();

  res.status(200).json({ success: true, message: "Password Updated" });
});

//forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    var user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User Does Not Exist", 404));
    }

    //will get our reset token
    var resetToken = user.generatePasswordResetToken();

    //saving the fields in DB which were set in generatePasswordResetToken method
    await user.save();

    //when testing with postman
    // var resetPasswordUrl = `${req.protocol}://${req.get("host")}/user/password/reset/${resetToken}`;

    //when testing with frontend
    // var resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    //when hosting in heroku
    var resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Dear ${user.name}, \n\nYour Reset Password Url is :- ${resetPasswordUrl} 
    \n\nThis Link Will Expire In 15 Minutes.Thank you \n\nRegards, \nStarMart Team`;

    await sendEmail({
      email: user.email,
      subject: "STAR MART Password Recovery",
      message,
    });

    res
      .status(200)
      .json({ success: true, message: `A Reset Password Link Sent!` });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorHandler(err.message, 500));
  }
};

//reset password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token Is Invalid or Has Been Expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .json({ success: true, message: "Password Reseted Successfully" });
});

///////////admin routes///////////////////////////

//get all users
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

//get single user by id
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found", 400));
  }

  res.status(200).json({ success: true, user });
});

// update user role by id
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  res.status(200).json({ success: true });
});

//delete user by id
exports.deleteUserByAdmin = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found", 400));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  await user.remove();

  res.status(200).json({ success: true, message: "User Deleted" });
});
