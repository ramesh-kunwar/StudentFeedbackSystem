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

router.route("/:id").get(getTeacher).put(updateTeachers).delete(deleteTeachers);

module.exports = router;
