const adminAuth = (req, res, next) => {
    if (!req.session || !req.session.admin) {
      console.log("Session data:", req.session); // Debug log
      return res.status(401).json({ message: "Unauthorized: Admin session required" });
    }
    next();
  };
  
  export default adminAuth;
  