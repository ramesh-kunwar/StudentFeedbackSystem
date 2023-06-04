const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: [true, "Teacher name is required"],
      unique: [true, "Teacher must be unique"],
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be atleast 1"],
      max: [5, "Rating cant be more than 5"],
    },
    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    coursesTaught: {
      type: [],
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
