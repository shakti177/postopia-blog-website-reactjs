const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_KEY,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.REFRESH_JWT_KEY,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

module.exports.generateToken = generateToken;
