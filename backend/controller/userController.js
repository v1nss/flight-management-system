import mongoose from "mongoose";
import Users from "../models/Users.js";
import dotenv from "dotenv";
import BCrypt from "../config/BCrypt.js";


dotenv.config();

// function for geting all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
    
    try {
      const user = req.body;
        
      const result = await Users.create({
        username: user.username,
        password: await BCrypt.hash(user.password),
        email: user.email,
      });

      res.status(200).json(result);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(400).json({ message: err.message });
    }
  };
  
  const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await Users.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Compare passwords
      const isPasswordCorrect = await BCrypt.compare(password, user.password);
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });
  
      // Store user data in session
      req.session.user = {
        id: user._id,
        username: user.username,
      };
  
      res.status(200).json({
        message: "Login successful",
        user: req.session.user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getUserInfo = async (req, res) => {
    try {
      const userId = req.session.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
  
      const user = await Users.findById(userId).select("info");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json(user.info);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const updateUser = async (req, res) => {
    try {
      const userId = req.session.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
  
      const updatedInfo = req.body;
  
      const user = await Users.findByIdAndUpdate(
        userId,
        { info: updatedInfo },
        { new: true, runValidators: true }
      );
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ message: "Information updated successfully", info: user.info });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  const logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
  };
  
  

export default {
    getAllUsers,
    // getSpecificUser,
    getUserInfo,
    createUser,
    updateUser,
    // deleteUser,
    loginUser,
    // googleLoginUser,
    logoutUser,
  };
  