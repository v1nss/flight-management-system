import mongoose from "mongoose";
import Users from "../models/Users.js";
import dotenv from "dotenv";

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
        credentials: {
          username: user.credentials.username,
          password: user.credentials.password,
          email: user.credentials.email,
        },
      });
  
      res.status(200).json(result);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(400).json({ message: err.message });
    }
  };
  

export default {
    getAllUsers,
    // getSpecificUser,
    createUser,
    // updateUser,
    // deleteUser,
    // loginUser,
    // googleLoginUser,
  };
  