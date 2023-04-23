const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateRoleOfUser,
  deleteUser,
} = require("../controllers/usersControllers");
const router = express.Router();
const { isAuthenticatonUser, authorizeRole } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/loginUser").post(loginUser);

router.route("/logoutUser").get(logoutUser);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/getUserDetails").get(isAuthenticatonUser, getUserDetails);

router.route("/changePassword").put(isAuthenticatonUser, changePassword);

router.route("/updateProfile").put(isAuthenticatonUser, updateUserProfile);

router
  .route("/admin/users")
  .get(isAuthenticatonUser, authorizeRole("admin"), getAllUsers);

  router
  .route("/admin/user/:id")
  .get(isAuthenticatonUser, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticatonUser, authorizeRole("admin"), updateRoleOfUser)
  .delete(isAuthenticatonUser, authorizeRole("admin"), deleteUser);

  module.exports = router;
