const passport = require("passport");

const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticateJwt;
