const express = require("express");
const {
  getTeachers,
  getTeacher,
  createTeachers,
  updateTeachers,
  deleteTeachers,
} = require("../controllers/teacherController");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/").get(getTeachers).post(isLoggedIn, createTeachers);

router.route("/:id").get(getTeacher).put(updateTeachers).delete(deleteTeachers);

module.exports = router;
