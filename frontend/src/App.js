import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust the path as needed
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateUser from "./pages/UpdateUser";
import FlightPage from "./pages/FlightPage"

const App = () => {
  const location = useLocation(); // Get current location

  // Define paths where the navbar should NOT appear
  const noNavbarPaths = ["/login", "/register"];

  return (
    <>
      {/* Conditionally render the navbar */}
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <div className={noNavbarPaths.includes(location.pathname) ? "" : "pt-16"}>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/FlightPage" element={<FlightPage />} />
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
