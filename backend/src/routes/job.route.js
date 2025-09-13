import express from "express";
const router = express.Router();
import {
  AdminJob,
  AllJobs,
  getJobById,
  postJob,
  publicJobs,
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/user.middleware.js";
const route = express.Router();
router.route("/get/public").get(publicJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/adminjob").get(isAuthenticated, AdminJob);
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, AllJobs);
export default router;
