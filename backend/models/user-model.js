const mongoose = require("mongoose");

function generateNumber() {
  return Math.floor(1 + Math.random() * 50);
}

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
      default: `https://avatar.iran.liara.run/public/${generateNumber()}`,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
