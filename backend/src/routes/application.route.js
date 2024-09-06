import express from "express";

import isAuthenticated from "../middlewares/user.middleware.js";
import {
  applyJob,
  getApplicant,
  getApplidJobs,
  updateStaus,
} from "../controllers/applicant.controller.js";
const router = express.Router();
router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getApplidJobs);
router.route("/:id/applicant").get(isAuthenticated, getApplicant);
router.route("status/:id/update").post(isAuthenticated, updateStaus);
export default router;
