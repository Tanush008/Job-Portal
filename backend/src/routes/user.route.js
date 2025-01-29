import express from "express";
import {
  login,
  Logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/user.middleware.js";
import {
  // handleMulterError,
  singleUpload,
} from "../middlewares/multer.middleware.js";
const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(Logout);
router
  .route("/profile/Update")
  .post(isAuthenticated, singleUpload, updateProfile);
export default router;
