import express from "express";
import flightController from "../controller/flightController.js";
import authenticate from "../middleware/authenticate.js";

const flightRoutes = express.Router();

// Add a new flight
flightRoutes.post("/", authenticate, flightController.addFlight);

// Get all flights for the logged-in user
flightRoutes.get("/", authenticate, flightController.getUserFlights);

flightRoutes.patch("/:flightId", authenticate, flightController.updateFlight);

// Delete a flight by ID
flightRoutes.delete("/:flightId", authenticate, flightController.deleteFlight);

export default flightRoutes;