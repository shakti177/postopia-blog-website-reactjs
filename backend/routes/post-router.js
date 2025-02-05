const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const upload = require("../middlewares/fileUpload");

const {
  createPost,
  updatePost,
  deletePost,
  allPost,
  postByCategory,
  postByAuthor,
} = require("../controllers/postController");

router.get("/", allPost);

router.post("/create", isLoggedIn, upload.single("thumbnail"), createPost);

router.patch("/update", isLoggedIn, upload.single("thumbnail"), updatePost);

router.delete("/delete", isLoggedIn, deletePost);

router.get("/category", postByCategory);

router.get("/author", postByAuthor);

module.exports = router;
