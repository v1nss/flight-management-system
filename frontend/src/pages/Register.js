import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(null); // State for success messages
  const navigate = useNavigate(); // Navigation hook

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    setSuccess(null); // Clear previous success

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // Send form data to the API
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page after success
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center flex-col font-sans">
      <div className="rounded-[10px] w-[80%] sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-1/6 h-fit text-center p-[24px] bg-gray-100 text-black shadow-lg border border-gray-400">
        <h2 className="font-extrabold text-2xl text-blue-800 mb-1">REGISTER</h2>
        <p className="text-xs mb-[30px]">Join the Flight Management System</p>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        {success && <p className="text-sm text-green-600 mb-4">{success}</p>}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Sign Up
          </button>
          <hr className="w-full" />
        </form>
      </div>
    </div>
  );
};

export default Register;
