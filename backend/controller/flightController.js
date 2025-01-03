import Flight from "../models/Flights.js";
import User from "../models/Users.js";

// Add a new flight for a user
const addFlight = async (req, res) => {
  try {
    const userId = req.session.user?.id; // Get logged-in user's ID from session
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { departureCity, arrivalCity, departureTime, arrivalTime, flightNumber } = req.body;

    // Create a new flight
    const newFlight = new Flight({
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      flightNumber,
    });

    // Save the flight to the database
    const savedFlight = await newFlight.save();

    // Associate the flight with the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.flights = user.flights || [];
    user.flights.push(savedFlight._id); // Assuming the User model has a `flights` array field
    await user.save();

    res.status(201).json({ message: "Flight added successfully", flight: savedFlight });
  } catch (error) {
    console.error("Error adding flight:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all flights for a user
const getUserFlights = async (req, res) => {
  try {
    const userId = req.session.user?.id; // Ensure the user is authenticated
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    console.log("User ID:", userId);

    const user = await User.findById(userId).populate("flights");
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("Flights:", user.flights);
    res.status(200).json({ flights: user.flights });
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete a flight by its ID
const deleteFlight = async (req, res) => {
  try {
    const userId = req.session.user?.id; // Get logged-in user's ID from session
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { flightId } = req.params;

    // Remove the flight from the database
    const deletedFlight = await Flight.findByIdAndDelete(flightId);
    if (!deletedFlight) return res.status(404).json({ message: "Flight not found" });

    // Remove the flight ID from the user's flights array
    const user = await User.findById(userId);
    if (user?.flights) {
      user.flights = user.flights.filter((id) => id.toString() !== flightId);
      await user.save();
    }

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error("Error deleting flight:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const { flightId } = req.params; // Extract flightId from route params
    const updatedFlight = await Flight.findByIdAndUpdate(flightId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate against schema
    });

    if (!updatedFlight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json({ updatedFlight });
  } catch (error) {
    console.error("Error updating flight:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export default {
    addFlight,
    getUserFlights,
    deleteFlight,
    updateFlight
  };
