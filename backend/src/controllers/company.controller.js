import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { CompanyName } = req.body;
    if (!CompanyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.find({ name: CompanyName });
    if (!company) {
      return res.status(400).json({
        message: "company not found",
        success: false,
      });
    }
    company = await Company.create({
      name: CompanyName,
      userId: req.id,
    });
    return res.status(200).json({
      message: "Company registered successfully",
      success: false,
    });
  } catch (error) {
    console.log();
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    const companies = await Company.findById({ userId });
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
    console.log();
  }
};
export const getCompanyBYId = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById({ companyId });
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company found successfully",
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, desc, website, location } = req.body;
    const file = req.file;

    const updateData = { name, desc, website, location };
    const company = await Company.findByIdAndDelete(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated",
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
