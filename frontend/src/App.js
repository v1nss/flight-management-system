import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust the path as needed
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import UpdateUser from "./pages/UpdateUser";
import FlightPage from "./pages/FlightPage";

// Admin pages
import AdminLogin from "./pages/admin/adminLogin";
import AdminRegister from "./pages/admin/adminRegister";
import AdminDashboard from "./pages/admin/adminDashboard";

const App = () => {
  const location = useLocation(); // Get current location

  // Define paths where the navbar should NOT appear
  const noNavbarPaths = ["/", "/login", "/register", "/admin/login", "/admin/register", "/admin/dashboard"];

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <div className={noNavbarPaths.includes(location.pathname) ? "" : "pt-16"}>
        <Routes>
          {/* User routes */} 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/FlightPage" element={<FlightPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
