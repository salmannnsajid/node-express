const express = require("express");
const {
  getUser,
  getUsers,
  deleteUser,
  createUser,
  updateUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const validate = require("../middleware/validateRequest");
const userSchema = require("../schemas/userSchema");

const router = express.Router();

router.post("/register", validate(userSchema), createUser);
router.post("/login", loginUser);
router.get("/", validateToken, getUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
