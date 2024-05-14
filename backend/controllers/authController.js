const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { use } = require("../routes/usersRouters");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

//@desc login user
//@route GET /login
//@access public
const loginUser = asyncHandler(async (req, resp) => {
  const { username, password } = req.body;
  if (!username || !password)
    return resp.status(400).json({ message: "All fields are required" });
  const user = await User.findOne({ username: username }).lean().exec();
  if (!user)
    return resp
      .status(400)
      .json({ message: "Username or password is incorrect" });
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect)
    return resp
      .status(400)
      .json({ message: "Username or password is incorrect" });

  const payload = {
    username: user.username,
    roles: user.roles,
  };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
    algorithm: "HS256",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
  resp
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 100,
      sameSite: "lax",
      secure: false,
    })
    .json({ accessToken: accessToken });
});

//@desc refresh access token
//@route GET /refresh
//@access private
const refreshToken = asyncHandler(async (req, resp) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return resp.status(403).json({ message: "Forbidden" });
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (error, decoded) => {
      if (error) return resp.status(403).json({ message: String(error) });
      const userFound = await User.findOne({ username: decoded.username })
        .lean()
        .exec();
      if (!userFound) return resp.status(401).json({ message: "Unauthorized" });
      const payload = {
        username: userFound.username,
        roles: userFound.roles,
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10s",
      });
      return resp.status(200).json({ accessToken: accessToken });
    })
  );
});
//@desc logout user
//@route POST /logout
//@access private
const logoutUser = asyncHandler(async (req, resp) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) return resp.status(204);
  resp.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return resp.status(200).json({ message: "Logged out" });
});

module.exports = { loginUser, refreshToken, logoutUser };
