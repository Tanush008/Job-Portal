import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/user.middleware.js";
import { singleUpload } from "../middlewares/multer.middleware.js";
// import { updateProfile } from "../controllers/user.controller";
const router = express.Router();
router.route("/get").get(isAuthenticated, getCompany);
router.route("/register").post(isAuthenticated, registerCompany);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
export default router;
