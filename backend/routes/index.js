const express = require("express");
const Post = require("../models/post-model");
const User = require("../models/user-model");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Blog Nest");
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postsById = await Post.findById(req.params.id);
    if (postsById) {
      res.json(postsById);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

module.exports = router;
