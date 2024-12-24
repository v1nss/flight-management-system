import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editFlightId, setEditFlightId] = useState(null); // Track the flight being edited
  const [editDetails, setEditDetails] = useState({
    departureCity: "",
    arrivalCity: "",
    departureTime: "",
    arrivalTime: "",
  });

  // Fetch all flights for the logged-in user
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axiosInstance.get("/flights");
        setFlights(response.data.flights || []);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setMessage("Failed to load flights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setMessage("Failed to load flights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  console.log(users)
  


  // Handle flight deletion
  const cancelFlight = async (flightId) => {
    try {
      await axiosInstance.delete(`/flights/${flightId}`);
      setFlights((prevFlights) => prevFlights.filter((flight) => flight._id !== flightId));
      setMessage("Flight canceled successfully!");
    } catch (error) {
      console.error("Error canceling flight:", error);
      setMessage("Failed to cancel the flight. Please try again.");
    }
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle editing a flight
  const editFlight = (flight) => {
    setEditFlightId(flight._id);
    setEditDetails({
      departureCity: flight.departureCity,
      arrivalCity: flight.arrivalCity,
      departureTime: new Date(flight.departureTime).toISOString().slice(0, 16), // Convert to datetime-local format
      arrivalTime: new Date(flight.arrivalTime).toISOString().slice(0, 16),
    });
    console.log(flight._id);
  };

  // Handle submitting the edited flight
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`/flights/${editFlightId}`, editDetails);
      setFlights((prevFlights) =>
        prevFlights.map((flight) =>
          flight._id === editFlightId ? { ...flight, ...response.data.updatedFlight } : flight
        )
      );
      setMessage("Flight updated successfully!");
      setEditFlightId(null); // Close the edit form
    } catch (error) {
      console.error("Error updating flight:", error);
      setMessage("Failed to update the flight. Please try again.");
    }
  };

  if (loading) return <div className="text-center py-8">Loading flights...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Flights</h1>
      {message && (
        <p className={`mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
      {flights.length === 0 ? (
        <p className="text-gray-600">You have no flights booked.</p>
      ) : (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight._id}
              className="p-4 bg-white rounded shadow-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">
                    {flight.departureCity} ➡ {flight.arrivalCity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Departure: {new Date(flight.departureTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Arrival: {new Date(flight.arrivalTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Flight Number: {flight.flightNumber}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editFlight(flight)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => cancelFlight(flight._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Cancel Flight
                  </button>
                </div>
              </div>

              {editFlightId === flight._id && (
                <form onSubmit={submitEdit} className="mt-4 p-4 bg-gray-100 rounded shadow space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Departure City</label>
                    <input
                      type="text"
                      name="departureCity"
                      value={editDetails.departureCity}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Arrival City</label>
                    <input
                      type="text"
                      name="arrivalCity"
                      value={editDetails.arrivalCity}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Departure Time</label>
                    <input
                      type="datetime-local"
                      name="departureTime"
                      value={editDetails.departureTime}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Arrival Time</label>
                    <input
                      type="datetime-local"
                      name="arrivalTime"
                      value={editDetails.arrivalTime}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditFlightId(null)}
                      className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default HomePage;
