import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Navigation hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      const response = await axiosInstance.post("/users/login", { username, password });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      // Handle error responses
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || "Invalid credentials.");
      } else if (err.request) {
        // Request was made but no response received
        setError("Unable to connect to the server. Please try again later.");
      } else {
        // Something else went wrong
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center flex-col font-sans">
      <div className="rounded-[10px] w-[80%] sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-1/6 h-fit text-center p-[24px] bg-gray-100 text-black shadow-lg border border-gray-400">
        <h2 className="font-extrabold text-2xl text-blue-800 mb-1">LOGIN</h2>
        <p className="text-xs mb-[30px]">Welcome to Flight Management System</p>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="gap-4 flex justify-center items-center flex-col"
        >
          <input
            className="w-full px-[20px] py-[10px] rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full px-[20px] py-[10px] rounded-md mb-1 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-[10px] w-[100%] px-[20px] py-[10px] rounded-md bg-blue-800 text-white hover:bg-blue-600 transition ease-in duration-300"
          >
            Log in
          </button>
          <hr className="w-full"></hr>
        </form>
      </div>
      <Link to="/register">
        <h3 className="mt-[10px] text-sm">
          Don't have an account?{" "}
          <span className="text-blue-600 hover:underline font-bold">
            Sign Up
          </span>
        </h3>
      </Link>
    </div>
  );
};

export default Login;
