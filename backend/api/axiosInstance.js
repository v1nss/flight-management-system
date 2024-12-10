import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true, // Enable cookies for session management
});

export default axiosInstance;
