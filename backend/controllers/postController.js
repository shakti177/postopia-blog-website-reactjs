const postModel = require("../models/post-model");
const userModel = require("../models/user-model");

module.exports.allPost = async (req, res) => {
  const { postId, page, limit } = req.query;

  try {
    if (postId) {
      try {
        const post = await postModel
          .findById(postId)
          .populate("author", "name profilePicture");
        if (post) {
          return res.json(post);
        }
      } catch (err) {
        return res.status(400).json({ error: "Post Not Found" });
      }
    } else {
      if (page && limit) {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const totalPosts = await postModel.countDocuments();

        const posts = await postModel
          .find()
          .populate("author", "name profilePicture")
          .sort({ createdAt: -1 })
          .skip((pageNumber - 1) * limitNumber)
          .limit(limitNumber);

        return res.json({
          posts,
          totalPages: Math.ceil(totalPosts / limitNumber),
          currentPage: pageNumber,
        });
      } else {
        const posts = await postModel
          .find()
          .populate("author", "name profilePicture")
          .sort({ createdAt: -1 });

        return res.json(posts);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const user = await userModel.findById(req.user._id);

    if (!title || title.trim() === "" || !content || content.trim() === "") {
      return res.status(400).json({
        status: "error",
        message:
          "Feilds are required and cannot be empty or contain only spaces.",
      });
    }

    const post = await postModel.create({
      title,
      content,
      category,
      author: user._id,
    });

    user.posts.push(post);
    await user.save();

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      post.thumbnail = `data:${req.file.mimetype};base64,${base64Image}`;
      await post.save();
    }

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
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({
        status: "error",
        message: "postId query parameter is required!",
      });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found!",
      });
    }

    if (post.author.toString() === req.user._id.toString()) {
      const { title, content, category } = req.body;

      if (title) post.title = title;
      if (content) post.content = content;
      if (category) post.category = category;

      if (req.file) {
        const base64Image = req.file.buffer.toString("base64");
        post.thumbnail = `data:${req.file.mimetype};base64,${base64Image}`;
        await post.save();
      }

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
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({
        status: "error",
        message: "postId query parameter is required!",
      });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found!",
      });
    }

    if (post.author.toString() === req.user._id.toString()) {
      await postModel.deleteOne({ _id: postId });

      await userModel.findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            posts: postId,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        message: "Post deleted successfully!",
      });
    } else {
      return res.status(401).json({
        status: "error",
        message: "You are not authorized to delete this post!",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};

module.exports.postByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    if (!category) {
      return res.status(400).json({
        status: "error",
        message: "category query parameter is required!",
      });
    }

    const posts = await postModel
      .find({ category })
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};

module.exports.postByAuthor = async (req, res) => {
  const { authorId } = req.query;

  try {
    if (!authorId) {
      return res.status(400).json({
        status: "error",
        message: "authorId query parameter is required!",
      });
    }

    const posts = await postModel
      .find({ author: authorId })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};
