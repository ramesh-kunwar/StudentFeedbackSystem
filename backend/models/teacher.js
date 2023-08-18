const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number },
    teachingSkill: {
      type: Number,
      required: true,
    },
    communicationSkill: {
      type: Number,
      required: true,
    },
    resourceProvided: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      required: true,
    },

    // likeCount: {
    //   type: Number,
    //   default: 0,
    // },

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
      required: true,
      default:
        "https://t3.ftcdn.net/jpg/02/44/40/64/360_F_244406408_87va1TTebuoPfUperNffP6upK2HioHfm.jpg",
    },
    description: {
      type: String,
      required: true,
    },

    teachingSkill: Number,
    communicationSkill: Number,
    resourceProvided: Number,
    rating: {
      type: Number,
    },

    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    coursesTaught: {
      type: [],
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
