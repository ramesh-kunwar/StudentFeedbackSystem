const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number },

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

const semesterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: [true, "Semester name is required"],
      unique: [true, "Semester name must be unique"],
    },

    description: {
      type: String,
    },

    rating: {
      type: Number,
      default: 0
    },

    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],

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

module.exports = mongoose.model("Semester", semesterSchema);
