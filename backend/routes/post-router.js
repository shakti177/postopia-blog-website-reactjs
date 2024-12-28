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

router.patch("/update/:id", isLoggedIn, updatePost);

router.post("/delete/:id", isLoggedIn, deletePost);

router.post(
  "/postThumbnail/:id",
  isLoggedIn,
  upload.single("thumbnail"),
  postThumbnail
);

module.exports = router;
