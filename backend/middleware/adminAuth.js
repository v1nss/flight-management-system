const adminAuth = (req, res, next) => {
    if (!req.session.admin) {
      return res.status(401).json({ message: "Unauthorized: Admin session required" });
    }
    next();
  };
  
  export default adminAuth;
  