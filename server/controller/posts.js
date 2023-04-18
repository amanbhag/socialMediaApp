const Post = require("../models/posts");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");

//create post app.js
exports.createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    console.log("user: ", user);
    const result = await cloudinary.uploader.upload(req.file.path);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: result.secure_url,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    console.log("posts: ", posts);
    // console.log("post: ", post);
    res.status(201).json(posts);
  } catch (error) {
    console.log("error: ", error);
    res.status(409).json({ error: error.message });
  }
};
//read

exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    console.log("error: ", error);
    res.status(404).json({ error: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    console.log("error: ", error);
    res.status(404).json({ error: error.message });
  }
};
// update
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
