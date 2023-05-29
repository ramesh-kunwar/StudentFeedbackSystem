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
 *      @desc Create user
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

  const user = await User.findOne({ email });

  const isMatchedPassword = await user.comparePassword(password);
  if (!email && !isMatchedPassword) {
    return next(new ErrorResponse(`Invalid credentials`, 404));
  }

  sendTokenResponse(user, 200, res);
});


/**********************************
      SEND TOKEN RESPONSE
/**********************************/
const sendTokenResponse = async (user, statusCode, res) => {
  // create token
  const token = await user.getJwtToken();
  user.token = token;

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  console.log(token);
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    data: user,
    token,
  });
};
