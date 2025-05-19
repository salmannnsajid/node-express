const jwt = require("jsonwebtoken");
const catchAsync = require("../helpers/catchAsync");

const validateToken = catchAsync(async (req, res, next) => {
  let token;

  let authHeaders = req.headers.Authorization || req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = validateToken;
