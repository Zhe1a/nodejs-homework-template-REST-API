const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  contactSchema,
  contactSchemaUpp,
} = require("../../validation/contactsSchema");

const validator = require("../../Middleware/validator");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: contactsList,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } else {
    res.json({
      status: "success",
      code: 404,
      data: { message: "Not found" },
    });
  }
});

const createContact = async (req, res, next) => {
  const body = req.body;
  const { name, email, phone } = body;
  console.log(body, name, email, phone);
  if (name && email && phone) {
    const contact = await addContact(req);
    res.json({
      status: "success",
      code: 201,
      contact: contact ? contact : "This contact has been added",
    });
    res.end();
  } else {
    res.json({
      status: "success",
      code: 400,
      message: "missing required name field",
    });
    res.end();
  }
};
router.post("/", validator(contactSchema), createContact);
router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req);
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      data: { message: "contact deleted" },
    });
  } else {
    res.json({
      status: "success",
      code: 404,
      data: { message: "Not found" },
    });
  }
});

const contactUpdate = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const contactUpdateContact = await updateContact(req);
    res.json({
      status: "success",
      code: 200,
      data: contactUpdateContact,
    });
  } else {
    res.json({
      status: "success",
      code: 400,
      message: "missing fields",
    });
  }
};

router.put("/:contactId", validator(contactSchemaUpp), contactUpdate);

module.exports = router;
