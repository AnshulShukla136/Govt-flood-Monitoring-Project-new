const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success:false, message:"No Token Provided" });
    }

    // Accept BOTH Bearer and Plain Token
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({ success:false, message:"Invalid Token" });
  }
};
