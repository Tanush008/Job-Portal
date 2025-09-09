import { Job } from "../models/job.model.js";
import { login } from "./user.controller.js";
// import { login } from "./user.controller";

export const postJob = async (req, res) => {
  try {
    const { title, desc, requirements, salary, location, position, companyId } =
      req.body;
    const userId = req.id;
    if (
      !title ||
      !desc ||
      !requirements ||
      !salary ||
      !location ||
      !position ||
      !companyId
    ) {
      return res.status(404).json({
        message: "Something is  missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      desc,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      position,
      company: companyId,
      created_By: userId,
    });
    return res.status(200).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};



export const AllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
        { position: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        // { salary: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};



export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "application",
    });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
export const AdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    // console.log(adminId);
    const jobs = await Job.find({ created_By: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    // console.log(jobs);

    if (!jobs) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
  }
};
