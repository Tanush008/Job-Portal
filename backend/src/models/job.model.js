import { application } from "express";
import mongoose, { Schema } from "mongoose";
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  location: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  jobType: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  requirements: [
    {
      type: String,
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: "Application",
  },
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema);
