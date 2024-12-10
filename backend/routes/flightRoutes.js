import express from "express";
import flightController from "../controller/flightController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

// Add a new flight
router.post("/", authenticate, flightController.addFlight);

// Get all flights for the logged-in user
router.get("/", authenticate, flightController.getUserFlights);

// Delete a flight by ID
router.delete("/:flightId", authenticate, flightController.deleteFlight);

export default flightRoutes;