import express from "express";
import {
  getCompany,
  getCompanyBYId,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/user.middleware.js";
// import { updateProfile } from "../controllers/user.controller";
const router = express.Router();
router.route("/get").post(isAuthenticated, getCompany);
router.route("/register").post(isAuthenticated, registerCompany);
router.route("/update/:id").post(isAuthenticated, updateCompany);
router.route("get/:id").get(isAuthenticated, getCompanyBYId);
export default router