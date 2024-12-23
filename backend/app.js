const express = require("express");
const app = express();
require("dotenv").config();

const db = require("./config/mongo-connection");

const indexRoutes = require("./routes/index");
const usersRouter = require("./routes/user-router");
const postsRouter = require("./routes/post-router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
