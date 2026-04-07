const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1]; // 🔥 Extract token after "Bearer"

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
