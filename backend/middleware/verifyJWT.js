const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyJWT = asyncHandler(async (req, resp, next) => {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization?.startsWith("Bearer"))
    return resp.status(401).json({ message: "Unauthorized" });
  const token = authorization.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (error, decoded) => {
      if (error) return resp.status(403).json({ message: "Forbidden" });
      next();
    })
  );
});

module.exports = verifyJWT;
