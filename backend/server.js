import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
// import userRoutes from './routes/userRoutes.js';
// import listingRoutes from './routes/listingRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/users", userRoutes);
// app.use("/listings", listingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
