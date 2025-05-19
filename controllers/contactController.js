const catchAsync = require("../helpers/catchAsync");
const Contact = require("../models/contacts");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  res.status(200).json(contacts);
});

//@desc Get single contact
//@route GET /api/contact/id
//@access public
const getContact = catchAsync(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findOne({ id, user_id: req.user.id });

  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }
  res.status(200).json({ contact });
});

const createContact = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!req.file) {
    return res.status(400).json({ errors: ["Please upload an image"] });
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
    image: req.file.filename,
  });
  res.status(201).json({ data: "Created", contact });
});

const updateContact = catchAsync(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update this contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ data: updatedContact });
});

const deleteContact = catchAsync(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete this contact");
  }
  res.status(200).json({ data: `Deleted ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
