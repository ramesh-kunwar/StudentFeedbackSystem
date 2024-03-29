const express = require("express");
const {
  getTeachers,
  getTeacher,
  createTeachers,
  updateTeachers,
  deleteTeachers,
  createTeacherReview,
  likeReview,
} = require("../controllers/teacherController");
const { isLoggedIn, isAdmin } = require("../middleware/user");
const { uploadImage } = require("../middleware/multer");

const router = express.Router();

router
  .route("/")
  .get(getTeachers)
  .post(isLoggedIn, isAdmin, uploadImage.single("image"), createTeachers);

router.route("/:id").get(getTeacher);
router
  .route("/:id")
  .put(isLoggedIn, isAdmin, updateTeachers)
  .delete(isLoggedIn, isAdmin, deleteTeachers);

// reviews
router.route("/:id/reviews").post(isLoggedIn, createTeacherReview);

// like a review
// router.route("/:id/reviews/like").get(isLoggedIn, likeReview);

module.exports = router;
