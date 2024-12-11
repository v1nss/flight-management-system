import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const FlightPage = () => {
  const [flightDetails, setFlightDetails] = useState({
    departureCity: "",
    arrivalCity: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [message, setMessage] = useState(null);

  // Generate a random flight number
  const generateFlightNumber = () => {
    return Math.floor(10000 + Math.random() * 90000); // Random 5-digit number
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const flightNumber = generateFlightNumber();

    try {
      const response = await axiosInstance.post("/flights", { ...flightDetails, flightNumber });
      setMessage("Flight added successfully!");
      setFlightDetails({
        departureCity: "",
        arrivalCity: "",
        departureTime: "",
        arrivalTime: "",
      });
    } catch (error) {
      console.error("Error adding flight:", error);
      setMessage("Failed to add flight. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add Flight</h1>
      {message && (
        <p className={`mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Departure City</label>
          <input
            type="text"
            name="departureCity"
            value={flightDetails.departureCity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Arrival City</label>
          <input
            type="text"
            name="arrivalCity"
            value={flightDetails.arrivalCity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Departure Time</label>
          <input
            type="datetime-local"
            name="departureTime"
            value={flightDetails.departureTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Arrival Time</label>
          <input
            type="datetime-local"
            name="arrivalTime"
            value={flightDetails.arrivalTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Add Flight
        </button>
      </form>
    </div>
  );
};

export default FlightPage;
