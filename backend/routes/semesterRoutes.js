const express = require("express");

const { isLoggedIn, isAdmin } = require("../middleware/user");
const {
  getSemesters,
  createSemester,
  getSemester,
  updateSemester,
  deleteSemester,
} = require("../controllers/semestercontroller");

const router = express.Router();

// router
//   .route("/")
//   .get(getTeachers)
//   .post(isLoggedIn, isAdmin, uploadImage.single("image"), createTeachers);

// router.route("/:id").get(getTeacher);
// router
//   .route("/:id")
//   .put(isLoggedIn, isAdmin, updateTeachers)
//   .delete(isLoggedIn, isAdmin, deleteTeachers);

// // reviews
// router.route("/:id/reviews").post(isLoggedIn, createTeacherReview);

// Semester
router.route("/").get(getSemesters).post(createSemester);
router.route("/:id").get(getSemester).put(updateSemester).delete(deleteSemester)

module.exports = router;
