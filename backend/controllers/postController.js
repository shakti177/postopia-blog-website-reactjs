const postModel = require("../models/post-model");
const userModel = require("../models/user-model");

module.exports.createPost = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!title || title.trim() === "" || !content || content.trim() === "") {
      return res.status(400).json({
        status: "error",
        message:
          "Feilds are required and cannot be empty or contain only spaces.",
      });
    }

    const post = await postModel.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    });

    post.user = user._id;
    post.save();
    user.posts.push(post);
    user.save();
    res.status(201).json({
      status: "success",
      message: "Post created successfully!",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found!",
      });
    }

    if (post.user.toString() === req.user._id.toString()) {
      const { title, content, category } = req.body;

      if (!title || title.trim() === "" || !content || content.trim() === "") {
        return res.status(400).json({
          status: "error",
          message:
            "Feilds are required and cannot be empty or contain only spaces.",
        });
      }

      if (title) post.title = title;
      if (content) post.content = content;
      if (category) post.category = category;

      await post.save();

      res.status(200).json({
        status: "success",
        message: "Post updated successfully!",
        data: post,
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "You are not authorized to update this post!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found!",
      });
    }

    if (post.user.toString() === req.user._id.toString()) {
      await postModel.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: "success",
        message: "Post deleted successfully!",
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "You are not authorized to delete this post!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};

module.exports.postThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64Image = req.file.buffer.toString("base64");

    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found!",
      });
    }

    post.thumbnail = `data:${req.file.mimetype};base64,${base64Image}`;
    await post.save();

    res.status(200).json({
      status: "success",
      message: "Thumbnail uploaded successfully!",
      data: post.thumbnail,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};
