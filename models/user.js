const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Plase add the name"] },
    email: {
      type: String,
      required: [true, "Plase add the email"],
      unique: [true, "Email is already take n."],
    },
    password: { type: String, required: [true, "Plase add the password"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
