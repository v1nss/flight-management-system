import express from "express";
import adminController from "../controller/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
import userController from "../controller/userController.js";

const adminRoutes = express.Router();

// Admin registration route
adminRoutes.post("/register", adminController.registerAdmin);

// Admin login route
adminRoutes.post("/login", adminController.loginAdmin);

// Admin logout route
adminRoutes.post("/logout", adminController.logoutAdmin);

adminRoutes.get("/users", adminAuth, userController.getAllUsers);

adminRoutes.patch("/users/:id", adminAuth, adminController.updateUser);
adminRoutes.delete("/users/:id", adminAuth, adminController.deleteUser);
// Example protected route
adminRoutes.get("/dashboard", adminAuth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.session.admin.username}` });
});

export default adminRoutes;
