import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js"

dotenv.config();
connectDB();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // MongoDB connection URI
      ttl: 14 * 24 * 60 * 60, // Optional: Time to live in seconds (14 days here)
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
