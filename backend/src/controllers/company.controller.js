import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDatauri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Already Existed",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(200).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    // console.log(companyId);
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company found successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, desc, website, location } = req.body;

    // Dynamically construct the updateData object
    const updateData = {};
    if (name) updateData.name = name;
    if (desc) updateData.desc = desc;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    // If a file is uploaded, process it
    if (req.file) {
      const fileUri = getDatauri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.Logo = cloudResponse.secure_url; // Add the logo URL to updateData
    }

    // Update the company in the database
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated document
    });

    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the company",
      success: false,
    });
  }
};
