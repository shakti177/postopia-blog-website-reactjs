const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    refreshTokens: [String],
    profilePicture: {
      type: String,
      default: "https://avatar.iran.liara.run/public/41",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
