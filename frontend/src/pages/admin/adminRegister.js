import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post("/admins/register", { username, email, password });

      if (response.status === 201) {
        setSuccess("Admin registered successfully!");
        setTimeout(() => navigate("/admin/login"), 2000); // Redirect to login after 2 seconds
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center flex-col font-sans">
      <div className="rounded-[10px] w-[80%] sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-1/6 h-fit text-center p-[24px] bg-gray-100 text-black shadow-lg border border-gray-400">
        <h2 className="font-extrabold text-2xl text-blue-800 mb-1">ADMIN REGISTER</h2>
        <p className="text-xs mb-[30px]">Create an Admin Account</p>
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
            className="w-full px-[20px] py-[10px] rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
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
            Register
          </button>
          <hr className="w-full"></hr>
        </form>
      </div>
      <div className="mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/admin/login")}
            className="text-blue-600 hover:underline font-bold cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
