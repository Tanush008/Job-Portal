import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
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
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 14);
    await User.create({
      fullname,
      email,
      role,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Register Successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }
    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).jsons({
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
    if (role != user.role) {
      return res.status(400).json({
        message: "account doesn't exist with the role",
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expire: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      profile: user.profile,
      role: user.role,
    };
    return res.status(200).cookie(
      "token",
      token,
      { maxAge: 1 * 24 * 60 * 1000, https: true, sameSite: "strict" }.json({
        message: `Welcome back ${user.fullname}`,
        success: true,
      })
    );
  } catch (error) {
    console.log(err);
  }
};

// Logout
export const Logout = async (req, res) => {
  try {
    return res.status(200).cookie(token, { maxAge: 0 }).json({
      message: "Logut successfully",
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    if (!fulllname || !email || !phoneNumber || !bio || !skills)
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      });
    const skillsarray = skills.split(",");
    const userId = req.id; //middleware authentication
    let user = await User.findOne(userId);
    if (!user)
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    //updating data
    (user.fullname = fullname),
      (user.email = email),
      (user.phoneNumber = phoneNumber),
      (user.profile.skills = skills),
      (user.profile.bio = bio);
    await user.save();
    (user.fullname = fullname),
      (user.email = email),
      (user.phoneNumber = phoneNumber),
      (user.profile.skills = skills),
      (user.profile.bio = bio);
    return res.status(201).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log();
  }
};
