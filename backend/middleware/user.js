const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token is exists
  if (!token) {
    // return next(new ErrorResponse(`Not authorized to access this route`, 401));
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  // if token exists verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    // return next(new ErrorResponse(`Not authorized to access this route`, 401));
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }
});
