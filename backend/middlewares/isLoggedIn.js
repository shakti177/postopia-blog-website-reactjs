const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "You must be logged in" });
  }

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
