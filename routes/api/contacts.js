const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactSchemaUpp = Joi.object({
  id: Joi.string().regex(/^[0-9]*$/),
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(/^[0-9]*$/),
});


const contactSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
});



const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error);
    return;
  }

  return next();
};



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



const createContact = async (req, res) => {
  const body = req.body;
  const { name, email, phone } = body;
  if (name && email && phone) {
    const contact = await addContact(body);
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
  const contactId = req.params.contactId;
  const contact = await removeContact(contactId);
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
    const contactId = req.params.contactId;
    const contactUpdateContact = await updateContact(contactId, req.body);
    res.json(contactUpdateContact);
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
