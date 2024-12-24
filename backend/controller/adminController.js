import Admin from "../models/Admins.js";
import bcrypt from "../config/BCrypt.js";
import User from "../models/Users.js";

// Register Admin
const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Admin with Session
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(404).json({ message: "Admin not found" });
  
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      // Set the admin session
      req.session.admin = {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      };
  
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error logging in admin:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

// Logout Admin
const logoutAdmin = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logout successful" });
  });
};

export const updateUser = async (req, res) => {
    try {
      const { id } = req.params; // User ID from the request URL
      const { username, email } = req.body; // Fields to update
  
      console.log("Update request received for user ID:", id);
      console.log("Update data:", { username, email });
  
      // Ensure at least one field is provided
      if (!username && !email) {
        return res.status(400).json({ message: "No fields to update provided" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...(username && { username }), ...(email && { email }) },
        { new: true, runValidators: true } // Return updated user and validate input
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error("Error in updateUser function:", error); // Log the error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params; // Extract user ID from params
  
      const deletedUser = await User.findByIdAndDelete(id); // Delete user by ID
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

export default {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    updateUser,
    deleteUser,
};