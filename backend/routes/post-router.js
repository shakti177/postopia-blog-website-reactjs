const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const upload = require("../middlewares/fileUpload");

const {
  createPost,
  updatePost,
  deletePost,
  postThumbnail,
} = require("../controllers/postController");

router.post("/create", isLoggedIn, createPost);

router.patch("/update/", isLoggedIn, updatePost);

router.delete("/delete", isLoggedIn, deletePost);

router.post(
  "/postThumbnail",
  isLoggedIn,
  upload.single("thumbnail"),
  postThumbnail
);

module.exports = router;
