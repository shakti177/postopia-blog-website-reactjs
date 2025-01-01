const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    thumbnail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
