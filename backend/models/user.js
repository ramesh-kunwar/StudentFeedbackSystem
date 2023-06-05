const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  token: String,
  role: {
    type: String,
    enum: ["user", "student", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypth the password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password =  bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassowrd) {
  return  bcrypt.compareSync(enteredPassowrd, this.password);
};

userSchema.methods.getJwtToken = async function () {
  return  jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
