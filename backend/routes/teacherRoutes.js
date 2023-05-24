const express = require("express")
const { getTeachers, getTeacher, createTeachers, updateTeachers, deleteTeachers } = require("../controllers/teacherController")
const router = express.Router()



router.route("/").get(getTeachers).post(createTeachers)

router.route("/:id").get(getTeacher).put(updateTeachers).delete(deleteTeachers)


module.exports = router