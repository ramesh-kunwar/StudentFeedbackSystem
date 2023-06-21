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
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new ErrorResponse(`Not authorized as admin`, 401));
  }
};
exports.isUniversity = (req, res, next) => {
  if (req.user && req.user.role === "university") {
    next();
  } else {
    return next(new ErrorResponse(`Not authorized as University`, 401));
  }
};
