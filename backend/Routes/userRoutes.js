const express = require("express");
const router = express.Router();

//controllers
const {
  registerUser,
  loginUser,
  loggedInUser,
  loggingOutUser,
  updateUser,
  deleteUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUserByAdmin
} = require("../Controllers/userControllers");

//middlewares
const { authenticatedUser } = require("../middleware/authenticatedUser");
const {authorizedRole} = require("../middleware/authorizedRole");

//user routes
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", authenticatedUser, loggingOutUser);

router.get("/me", authenticatedUser, loggedInUser);

router.put("/me/update", authenticatedUser, updateUser);

router.delete("/me/delete", authenticatedUser, deleteUser);

router.put("/me/update-password", authenticatedUser, updatePassword);

//forgot password routes
router.post("/password/forgot" , forgotPassword);

router.put("/password/reset/:token" , resetPassword);

//admin routes
router.get("/admin/all-users" , authenticatedUser , authorizedRole("admin") , getAllUsers)

router.get("/admin/user/:id" , authenticatedUser ,authorizedRole("admin") , getSingleUser);

router.put("/admin/user/:id" , authenticatedUser ,authorizedRole("admin") ,updateUserRole);

router.delete("/admin/user/:id" , authenticatedUser ,authorizedRole("admin") , deleteUserByAdmin)


module.exports = router;

// router.put('/me/update')

// router.delete('/me/delete')
