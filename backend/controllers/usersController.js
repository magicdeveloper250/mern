const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

//@desc get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async (req, resp) => {
  const users = await User.find().select("-password").lean().exec();
  if (users) return resp.status(200).json(users);
  return resp.status(400).json({ message: "No users found" });
});

//@desc get one user
//@route GET /users/:id
//@access Private
const getOneUser = asyncHandler(async (req, resp) => {
  const userId = req.params.id;
  if (!userId) return resp.status(400).json({ message: "user id is required" });
  const user = await User.findById(userId).select("-password").lean().exec();
  if (!user) return resp.status(400).json({ message: "User not found" });
  user.password = "";
  return resp.status(200).json(user);
});

//@desc create new user
//@route POST /users
//@access private
const createNewUser = asyncHandler(async (req, resp) => {
  const { username, password, roles } = req.body;
  // check if all data required are provided
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return resp.status(400).json({
      message: ` All fields are required ${(username, password, roles)}`,
    });
  }

  // check if user already exist
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate)
    return resp.status(409).json({ message: "username already exists" });

  // hash password
  const hashedpwd = await bcrypt.hash(password, 12);
  const userObject = { username, password: hashedpwd, roles };
  // store new user in database
  const user = await User.create(userObject);
  if (user) {
    return resp.status(201).json({ message: `New user ${username} created` });
  } else {
    return resp.status(400).json({ message: "Invalid user data received" });
  }
});
//@desc update user
//@route PATCH
//@access private
const updateUser = asyncHandler(async (req, resp) => {
  const { _id, username, roles, active, password } = req.body;
  console.log(typeof active);
  //check recieved data
  if (
    !_id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof Boolean(active) !== "boolean"
  )
    return resp.status(400).json({ message: "All field are required" });

  const user = await User.findById(_id).exec();
  if (!user) return resp.status(400).json({ message: "User not found" });
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate && duplicate?._id.toString() !== _id) {
    return resp.status(409).json({ message: "username already exists" });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;
  if (password) user.password = await bcrypt.hash(password, 12);

  // now update the user
  const updatedUser = await user.save();
  resp
    .status(200)
    .json({ message: `${updatedUser.username} updated successfully` });
});

//@desc delete user
//@route DELELE /users
//@access private
const deleteUser = asyncHandler(async (req, resp) => {
  const { id } = req.body;
  console.log(id);
  if (!id) return resp.status(400).json({ message: "User id is required" });
  const posts = await Post.findOne({ author: id }).exec();
  if (posts)
    return resp.status(400).json({
      message: "Sorry, we can't delete this user because has assigned Post.",
    });
  const user = await User.findById(id).exec();
  if (!user) return resp.status(400).json({ message: "User not found" });
  const deletedUser = await user.deleteOne();
  return resp.status(200).json({
    message: `user with username:${deletedUser.username} and id: ${deletedUser.id} removed from database`,
  });
});

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateUser,
  deleteUser,
};
