const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  deleteUser,
  refreshToken,
} = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.send("Hello from the user router!");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.patch("/update", isLoggedIn, updateUser);

router.get("/profile", isLoggedIn, getUser);

router.delete("/delete", isLoggedIn, deleteUser);

router.post("/refresh-token", refreshToken);

module.exports = router;
