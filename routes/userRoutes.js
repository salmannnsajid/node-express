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

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", validateToken, getUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
