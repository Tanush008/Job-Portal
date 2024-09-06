import { Job } from "../models/job.model.js";
// import { login } from "./user.controller";

export const postJob = async (req, res) => {
  try {
    const { title, desc, requriement, salary, location, position } = req.body;
    const userId = req.id;
    if (!title || !desc || !requriement || !salary || !location || !position) {
      return res.status(404).json({
        message: "Something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      desc,
      requriement: requriement.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: "New job created successfully",
      success: false,
    });
  } catch (error) {
    console.log();
  }
};
export const AllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate(
      { path: company },
      sort({ createdAt: -1 })
    );
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
    const job = await Job.findById({ jobId });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log();
  }
};
export const AdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.findById({ created_by: adminId });
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
