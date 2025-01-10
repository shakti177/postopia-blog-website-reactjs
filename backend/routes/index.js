const express = require("express");
const Post = require("../models/post-model");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Blog Nest");
});

router.get("/posts", async (req, res) => {
  const { postId } = req.query;

  try {
    if (postId) {
      const post = await Post.findById(postId);
      if (post) {
        return res.json(post);
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    } else {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

module.exports = router;
