import express from "express";
const router = express.Router()
import { AdminJob, AllJobs, getJobById, postJob } from "../controllers/job.controller.js";
const route = express.Router();
router.route("/get/:id").get(getJobById);
router.route("/getadminjob").get(AdminJob);
router.route("/post").post(postJob);
router.route("/get").get(AllJobs)
export default router