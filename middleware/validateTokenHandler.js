const jwt = require("jsonwebtoken");
const catchAsync = require("../helpers/catchAsync");

const validateToken = catchAsync(async (req, res, next) => {
  let token;

  let authHeaders = req.headers.Authorization || req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not authorized");
      }

      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = validateToken;
