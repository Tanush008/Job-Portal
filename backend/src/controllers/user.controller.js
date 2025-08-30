import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
// Register
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    let profilePhoto = "https://via.placeholder.com/150"; // Default profile photo
    if (req.file) {
      const fileUri = getDatauri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhoto = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      role,
      password: hashedPassword,
      profile: {
        profilePhoto,
      },
    });

    return res.status(201).json({
      message: "Register Successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "An error occurred during registration",
      success: false,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email, password, role);
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "incorrect password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesn't exist with the role",
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      profile: user.profile,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// Logout
export const Logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", { maxAge: 0 }).json({
      message: "Logut successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // Middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // console.log("byeeefefaj;fa");

    // Handle profile photo upload
    // Handle profile photo upload
    if (req.files && req.files.profilePhoto) {
      try {
        const profilePhotoFile = req.files.profilePhoto[0]; // first file
        const fileUri = getDatauri(profilePhotoFile);
        const profilePhotoResponse = await cloudinary.uploader.upload(
          fileUri.content
        );
        user.profile.profilePhoto = profilePhotoResponse.secure_url;
      } catch (error) {
        console.error("Error uploading profile photo:", error);
        return res.status(500).json({
          message: "Failed to upload profile photo",
          success: false,
        });
      }
    }

    // Handle resume upload
    if (req.files && req.files.resume) {
      try {
        const resumeFile = req.files.resume[0]; // first file
        const resumeUri = getDatauri(resumeFile);
        const resumeResponse = await cloudinary.uploader.upload(
          resumeUri.content
        );
        user.profile.resume = resumeResponse.secure_url;
        user.profile.resumeOriginalName = resumeFile.originalname;
      } catch (error) {
        console.error("Error uploading resume:", error);
        return res.status(500).json({
          message: "Failed to upload resume",
          success: false,
        });
      }
    }
    await user.save();

    // Return updated user data
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(201).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({
      message: "An error occurred while updating the profile",
      success: false,
    });
  }
};
