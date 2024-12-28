const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // remove bearer from token

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "You need to log in first!",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token!",
    });
  }
};
