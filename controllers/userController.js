const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const catchAsync = require("../helpers/catchAsync");

const getUsers = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const users = await User.find();

  res.status(200).json(users);
});

const getUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }
  res.status(200).json({ user });
});

const createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userAvailable = await User.findOne({ email });
  console.log({ userAvailable });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ data: "Created", user });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        {
          user: { name: user.name, email: user.email, id: user._id },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // cookies send to browser and saved automatically
      // also as long cookie is saved it will be sent back to server automatically

      res.cookie("testCookie", "cookie value", {
        maxAge: 600000,
      });
      res.status(200).json({ accessToken });
    } else {
      res.status(400);
      throw new Error("Incorrect Password");
    }
  } else {
    res.status(400);
    throw new Error("No user found");
  }
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ data: updatedUser });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  res.status(200).json({ data: `Deleted ${req.params.id}` });
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
