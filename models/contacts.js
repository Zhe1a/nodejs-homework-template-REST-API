const Contacts = require('./model');

const listContacts = async (req, res, next) => {
try {
  const item = await Contacts.find();
  return res.status(200).json(item);
} catch (error) {
  res.send(error);
}
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const item = await Contacts.findOne({ id: contactId });
    if (item) {
      return res.status(200).json(item);
    } else {
      return res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.send(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const item = await Contacts.findOneAndDelete({ id: contactId });
    if (item) {
      res.status(200).send({ message: "contact deleted" });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const item = await Contacts.create(req.body);
    return res.status(200).json(item);
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
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Not found" });
    }
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
