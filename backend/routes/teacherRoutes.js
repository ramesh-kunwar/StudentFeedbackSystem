const express = require("express");
const {
  getTeachers,
  getTeacher,
  createTeachers,
  updateTeachers,
  deleteTeachers,
} = require("../controllers/teacherController");
const { isLoggedIn, isAdmin } = require("../middleware/user");

const router = express.Router();

router.route("/").get(getTeachers).post(isLoggedIn, isAdmin, createTeachers);

router.route("/:id").get(getTeacher);
router
  .route("/:id")
  .put(isLoggedIn, isAdmin, updateTeachers)
  .delete(isLoggedIn, isAdmin, deleteTeachers);

module.exports = router;
