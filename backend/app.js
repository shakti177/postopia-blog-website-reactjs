const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const db = require("./config/mongo-connection");

const usersRouter = require("./routes/user-router");
const postsRouter = require("./routes/post-router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Postopia");
});
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
