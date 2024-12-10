import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const LandingPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    nationality: "",
    birthDate: "",
    gender: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/me"); // Get logged-in user's info
        setUserInfo(response.data || {}); // Populate form with existing data
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axiosInstance.patch("/me", userInfo); // Update logged-in user's info
      setMessage("Information updated successfully!");
    } catch (error) {
      console.error("Error updating info:", error);
      setMessage("Failed to update information. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Update Your Information</h1>
      {message && (
        <p className={`mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={userInfo.nationality}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={userInfo.birthDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={userInfo.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
