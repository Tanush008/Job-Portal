import { application } from "express";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const user = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    const existingApplicantion = await Application.findById({ user, jobId });
    if (existingApplicantion) {
      return res.status(400).json({
        message: "You have already applied",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }
    // create a new Application
    const newApplication = await Application.create({
      job: jobId,
      user: user,
    });
    job.application.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
export const getApplidJobs = async (req, res) => {
  try {
    const userid = req.id;
    const applicantion = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applicantion) {
      return res.stauts(400).json({
        message: "No applications",
        success: false,
      });
    }
    return res.status(200).json({
      applicantion,
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      paths: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        succes: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
export const updateStaus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "status is required", success: false });
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found",
        success: false,
      });
    }
    // update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
