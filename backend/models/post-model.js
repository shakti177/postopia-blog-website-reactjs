const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: {
      type: String,
      default:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjg0FNUpvkkz8JVZeYKhSyWH02CbY6SmeJfI5Jwv8dMPFP9vlwXhO6s1w53WiyZRVDkTkeqWUGWGhSyHT8kEY3rQa1FEjdXjz8R4UDKI3AJl_8lAVHOSmDU2cuuONzkqEKXxIG7T1J6VdderEIhdBtWHu_MrtXcEKvlin0LBB1594KwCXAfd7sV6MN-94_K/s16000/thumbnail%20(1).png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
