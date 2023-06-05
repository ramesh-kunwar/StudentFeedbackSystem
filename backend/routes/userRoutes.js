const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const { isAdmin, isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/profile").put(isLoggedIn, updateUserProfile)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/:id").delete(deleteUser)

module.exports = router;
