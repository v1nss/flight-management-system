import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await axiosInstance.post("/users/logout");
          navigate("/login");
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-300">
          Flight Management
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:underline hover:text-blue-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/FlightPage"
            className="hover:underline hover:text-blue-300 transition duration-300"
          >
            Add Flight
          </Link>
          <Link
            to="/UpdateUser"
            className="hover:underline hover:text-blue-300 transition duration-300"
          >
            Update Info
          </Link>
          {/* <Link
            to="/contact"
            className="hover:underline hover:text-blue-300 transition duration-300"
          >
            Contact
          </Link> */}
          <Link
            onClick={handleLogout}
            className="hover:underline hover:text-blue-300 transition duration-300"
          >
            Logout
          </Link>
        </div>

        {/* Mobile Menu Button
        // <button
        //   className="md:hidden focus:outline-none"
        //   id="menu-button"
        // >
        //   <svg
        //     className="w-6 h-6"
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        //   >
        //     <path
        //       strokeLinecap="round"
        //       strokeLinejoin="round"
        //       strokeWidth="2"
        //       d="M4 6h16M4 12h16M4 18h16"
        //     />
        //   </svg>
        // </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
