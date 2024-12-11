import express from "express";
import adminController from "../controller/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRoutes = express.Router();

// Admin registration route
adminRoutes.post("/register", adminController.registerAdmin);

// Admin login route
adminRoutes.post("/login", adminController.loginAdmin);

// Admin logout route
adminRoutes.post("/logout", adminController.logoutAdmin);

// Example protected route
adminRoutes.get("/dashboard", adminAuth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.session.admin.username}` });
});

export default adminRoutes;
