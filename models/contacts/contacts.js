const Contacts = require("../../validation/contacts");

const listContacts = async (req, res, next) => {
  try {
    const item = await Contacts.find();
    return item;
  } catch (error) {
    res.send(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const item = await Contacts.findOne({ id: contactId });
    return item;
  } catch (error) {
    res.send(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const item = await Contacts.findOneAndDelete({ id: contactId });
    return item;
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name } = req.body;
    const contactName = await Contacts.findOne({ name });
    if (contactName) {
      return { message: "This contact already exists on the server" };
    } else {
      const item = await Contacts.create(req.body);
      return false;
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const newProperties = req.body;
    const item = await Contacts.findOneAndUpdate(
      { id: contactId },
      { $set: newProperties },
      { new: true }
    );
    return item;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
