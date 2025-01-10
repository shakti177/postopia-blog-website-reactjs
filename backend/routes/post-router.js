const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const upload = require("../middlewares/fileUpload");

const {
  createPost,
  updatePost,
  deletePost,
  postThumbnail,
  allPost,
} = require("../controllers/postController");

router.get("/", allPost);

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
