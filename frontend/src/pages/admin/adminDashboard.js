import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // List of users
  const [message, setMessage] = useState(null); // Success/error messages
  const [editingUser, setEditingUser] = useState(null); // Currently editing user ID
  const [editingFlight, setEditingFlight] = useState(null); // Currently editing flight ID
  const [editUserDetails, setEditUserDetails] = useState({}); // User details being edited
  const [editFlightDetails, setEditFlightDetails] = useState({}); // Flight details being edited

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admins/users", {
          withCredentials: true,
        });
        setUsers(response.data.users || []); // Safely handle the response
      } catch (error) {
        console.error("Error fetching users:", error);
        setMessage("Failed to load users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  // Handle editing user
  const startEditingUser = (user) => {
    setEditingUser(user._id); // Set user being edited
    setEditUserDetails({ username: user.username, email: user.email }); // Set editable details
  };

  const submitEditUser = async (e) => {
    e.preventDefault();
    try {
      // API call to update the user
      const response = await axiosInstance.patch(
        `/admins/users/${editingUser}`, // Ensure the correct endpoint
        editUserDetails, // Send updated user details
        { withCredentials: true } // Include credentials if needed
      );
  
      // Check if the response contains the updated user
      const updatedUser = response.data.updatedUser;
  
      // Update the local state with the updated user data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser ? { ...user, ...updatedUser } : user
        )
      );
  
      setMessage("User updated successfully!"); // Success message
      setEditingUser(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating user:", error);
  
      // Error handling
      if (error.response) {
        setMessage(error.response.data.message || "Failed to update user. Please try again.");
      } else {
        setMessage("Failed to update user. Please try again.");
      }
    }
  };
  
  const deleteFlight = async (flightId) => {
    try {
      // API call to delete the flight
      await axiosInstance.delete(`/flights/${flightId}`, {
        withCredentials: true, // Ensure credentials are included if needed
      });
  
      // Update the users state by removing the deleted flight
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          flights: user.flights.filter((flight) => flight._id !== flightId),
        }))
      );
  
      setMessage("Flight deleted successfully!"); // Success message
    } catch (error) {
      console.error("Error deleting flight:", error);
  
      // Error handling
      if (error.response) {
        setMessage(error.response.data.message || "Failed to delete flight. Please try again.");
      } else {
        setMessage("Failed to delete flight. Please try again.");
      }
    }
  };

  // Handle deleting user
  const deleteUser = async (userId) => {
    try {
      // API call to delete the user
      await axiosInstance.delete(`/admins/users/${userId}`, {
        withCredentials: true, // Ensure credentials are included if needed
      });
  
      // Update the users state by removing the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  
      setMessage("User deleted successfully!"); // Success message
    } catch (error) {
      console.error("Error deleting user:", error);
  
      // Error handling
      if (error.response) {
        setMessage(error.response.data.message || "Failed to delete user. Please try again.");
      } else {
        setMessage("Failed to delete user. Please try again.");
      }
    }
  };
  
  // Handle editing flight
  const startEditingFlight = (flight) => {
    setEditingFlight(flight._id); // Set flight being edited
    setEditFlightDetails({
      departureCity: flight.departureCity,
      arrivalCity: flight.arrivalCity,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      flightNumber: flight.flightNumber,
    });
  };

  const submitEditFlight = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/flights/${editingFlight}`,
        editFlightDetails
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          flights: user.flights.map((flight) =>
            flight._id === editingFlight
              ? { ...flight, ...response.data.updatedFlight }
              : flight
          ),
        }))
      );
      setMessage("Flight updated successfully!");
      setEditingFlight(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating flight:", error);
      setMessage("Failed to update flight. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {message && (
        <p
          className={`mb-4 ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="p-4 bg-white rounded shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{user.username}</p>
                  <p className="text-sm text-gray-600">Email: {user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditingUser(user)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    Edit User
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                  >
                    Delete User
                  </button>
                </div>
              </div>
  
              {/* Edit User Form */}
              {editingUser === user._id && (
                <form onSubmit={submitEditUser} className="mt-4 p-4 bg-gray-100 rounded shadow space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editUserDetails.username}
                      onChange={(e) =>
                        setEditUserDetails({ ...editUserDetails, username: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editUserDetails.email}
                      onChange={(e) =>
                        setEditUserDetails({ ...editUserDetails, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded"
                      required
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
                      onClick={() => setEditingUser(null)}
                      className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
  
              <h3 className="mt-2 text-md font-semibold">Flights:</h3>
              {user.flights.length > 0 ? (
                <div className="space-y-4">
                  {user.flights.map((flight) => (
                    <div
                      key={flight._id}
                      className="p-4 bg-gray-50 rounded shadow-md flex justify-between items-center"
                    >
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
                          onClick={() => startEditingFlight(flight)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFlight(flight._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No flights assigned.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  
};

export default AdminDashboard;
