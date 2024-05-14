const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
//@desc get all posts
//@route GET /posts
//@access private
const getAllPosts = asyncHandler(async (req, resp) => {
  const posts = await Post.find().lean().exec();
  resp.status(200).json(posts);
});
//@desc create new user
//@desc GET /posts/:id
const getOnePost = asyncHandler(async (req, resp) => {
  const postId = req.params.id;
  if (!postId) return resp.status(400).json({ message: "post id required" });
  const post = await Post.findById(postId).lean().exec();
  if (!post) return resp.status(400).json({ message: "Post not found" });
  return resp.status(200).json(post);
});

//@desc create new user
//@route POST /posts
//@access private
const createNewPost = asyncHandler(async (req, resp) => {
  const { title, created, author, content, category } = req.body;
  if (!title || !created || !author || !content || !category) {
    return resp.status(400).json({ message: "All fields are required" });
  }
  const postObject = { title, created, author, content, category };
  const createdPost = await Post.create(postObject);
  if (createdPost)
    return resp.status(201).json({ message: "New post ceated successfully" });
  else {
    return resp.status(400).json({ message: "Invalid data received" });
  }
});

//@desc update post
//@route PATCH /posts
//@access private
const updatePost = asyncHandler(async (req, resp) => {
  const { _id, title, content, category } = req.body;
  if (!_id || !title || !content || !category)
    return resp.status(400).json({ message: "All field are required" });
  const post = await Post.findById(_id).exec();
  if (!post) return resp.status(400).json({ message: "Post not found" });
  post.title = title;
  post.content = content;
  post.category = category;
  const updatedPost = await post.save();
  if (!updatedPost)
    return resp
      .status(400)
      .json({ message: "data provided are invalid", data: updatedPost });
  return resp.status(200).json({ message: "Post update success" });
});
//@desc delete post
//@route DELETE /posts
//@access private
const deletePost = asyncHandler(async (req, resp) => {
  const { postId } = req.body;
  if (!postId) return resp.status(400).json({ message: "Post id is required" });
  const post = await Post.findById(postId).exec();
  if (!post) return resp.status(400).json({ message: "Post not found" });
  const deletedPost = await post.deleteOne();
  if (!deletedPost)
    return resp.status(400).json({ message: "the data provided are invalid" });
  return resp
    .status(200)
    .json({ message: "post deleted successfully" + deletedPost.title });
});
//@desc like post
//@route PATCH /posts
//@access public
const likePost = asyncHandler(async (req, resp) => {
  const { id, postId } = req.body;
  const post = await Post.findById(postId).exec();
  if (post.likes.indexOf(id) !== -1)
    return resp.status(400).json({ message: "you already liked" });
  post.likes.push(id);
  const likedPost = await post.save();
  resp.status(200).json(likedPost);
});

module.exports = {
  getAllPosts,
  getOnePost,
  createNewPost,
  updatePost,
  deletePost,
  likePost,
};
