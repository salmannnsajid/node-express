const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "Plase add the name"] },
    email: {
      type: String,
      required: [true, "Plase add the email"],
      unique: [true, "Email is already taken."],
    },
    phone: { type: String, required: [true, "Plase add the phone"] },
    image: { type: String, required: [true, "Plase add the image"] },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
