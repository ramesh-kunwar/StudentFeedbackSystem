const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: [true, "Teacher name is required"],
      unique: [true, "Teacher must be unique"],
    },
    image: {
      type: String,
      // required: true,
      default:
        "https://media.istockphoto.com/id/1083619800/photo/crazy-angry-professor-yelling-and-pointing-with-a-stick.jpg?s=170667a&w=0&k=20&c=rpt1trxyXX9pmzp_qrGgQEx6IZWb63T97htEkDniT7Y=",
      // "https://media.istockphoto.com/id/1083619800/photo/crazy-angry-professor-yelling-and-pointing-with-a-stick.jpg?s=612x612&w=0&k=20&c=ykXbJvGrrRltXpJNl9iB55cf393d4NtCkDSg9tsuqU0=",
      // id: { type: String },
      // secure_url: { type: String },
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
    },
    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],

    photo: {
      id: { type: String },
      secure_url: { type: String },
    },
    coursesTaught: {
      type: [],
      // require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
