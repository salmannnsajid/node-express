const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const authenticateJwt = require("../middleware/authenticateJwt");
const validate = require("../middleware/validateRequest");
const upload = require("../middleware/upload");
const contactSchema = require("../schemas/contactsSchema");

// const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// router.use(validateToken);
router.use(authenticateJwt);

router
  .route("/")
  .get(getContacts)
  .post(validate(contactSchema), upload.single("image"), createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
