const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/user");

/**********************************
 *      @desc Create user
 *      @route POST /api/v1/users
 *      @access Private
/**********************************/

exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    count: user.length,
    data: user,
  });
});

/**********************************
 *      @desc Create user / Register User
 *      @route POST /api/v1/users
 *      @access Private
/**********************************/

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // validating the data
  if (!name || !email || !password) {
    return next(new ErrorResponse(`All fields are required`, 400));
  }

  // checking for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse(`User already exists`, 400));
  }

  // creating a user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

/**********************************
 *      @desc Create user
 *      @route POST /api/v1/users
 *      @access Private
/**********************************/

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validating the data
  if (!email || !password) {
    return next(new ErrorResponse(`All fields are required`, 400));
  }

  const user = await User.findOne({ email }).select("+password");

  const isMatchedPassword = await user.comparePassword(password);
  if (!isMatchedPassword) {
    return next(new ErrorResponse(`Invalid credentials`, 404));
  }

  sendTokenResponse(user, 200, res);
});

/**********************************
 *      @desc Logout user
 *      @route GET /api/v1/users
 *      @access Private
/**********************************/

exports.logoutUser = asyncHandler(async (req, res, next) => {
  // clear cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    msg: "Logout successfully",
  });
});

/**********************************
 *      @desc Update User
 *      @route PUT /api/v1/users
 *      @access Private
/**********************************/

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  await User.deleteOne();

  const updatedUser = await user.save();
  res.status(200).json({
    msg: "User deleted successfully",
    user,
  });
});

/**********************************
 *      @desc Update User
 *      @route PUT /api/v1/users
 *      @access Private
/**********************************/

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
  }

  const updatedUser = await user.save();
  res.status(200).json({
    msg: "User updated successfully",
    updatedUser,
  });
});

/**********************************
      SEND TOKEN RESPONSE
/**********************************/
const sendTokenResponse = async (user, statusCode, res) => {
  // create token
  const token = await user.getJwtToken();
  console.log(token);
  user.token = token;

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, options);
  res.status(statusCode).json({
    success: true,
    data: user,
    token,
  });
};
