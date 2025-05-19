const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "Plase add the name"] },
    email: { type: String, required: [true, "Plase add the email"] },
    phone: { type: String, required: [true, "Plase add the phone"] },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
