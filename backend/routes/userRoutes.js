import express from "express";
import userController from "../controller/userController.js";
import authenticate from "../middleware/authenticate.js";

const userRoutes = express.Router();

userRoutes.get("/me", authenticate, (req, res) => {
    // Return the logged-in user's data from the session
    res.status(200).json(req.session.user);
  });

// routes for allusers and specificuser, add user, update user, and delete user
userRoutes.get("/", userController.getAllUsers);
userRoutes.get('/users', userController.getAllUsers);

// Get logged-in user's info
userRoutes.get("/:id", userController.getUserInfo);

// Update logged-in user's info
userRoutes.patch("/:id", userController.updateUser);

// userRoutes.get("/:id", userController.getSpecificUser);

// route for create/upload profile and picture
userRoutes.post("/", userController.createUser);

// for login purpose
userRoutes.post("/login", userController.loginUser);

userRoutes.post("/logout", authenticate, (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.status(200).json({ message: "Logout successful" });
    });
  });

userRoutes.get("/me", authenticate, userController.getUserInfo);
userRoutes.patch("/me", authenticate, userController.updateUser);
export default userRoutes;