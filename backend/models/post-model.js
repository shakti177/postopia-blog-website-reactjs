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
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEig2v1RtW7VyxFL-72o04C7RGJ8TrpXg_Tw1qNjoOHi30gyvEaz0PPFQ7DTzM2J9yCljMY9Y0exWi0N4oOMu_GJvQ_r6l6X3DwqqAerNBMbf6MQE6afta2q0sNZJUrKM4KVSh8j_YJNROmArCG3krxNLImhC_sg8rK1NE0kSlAGThtTTyjbm2ic_MyZLfAS/s16000/thumbnail.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
