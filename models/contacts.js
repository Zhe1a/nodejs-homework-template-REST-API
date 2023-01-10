const { readFile, writeFile } = require("fs/promises");

const path = require("path");

const contactsPath = path.resolve(__dirname, "../models/contacts.json");

const listContacts = async (req, res) => {
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  return contacts;
};

const getContactById = async (contactId) => {
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contact = contacts.find((el) => el.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contactRemove = contacts.find((el) => el.id === contactId);
  if (contactRemove) {
    const contact = contacts.filter((el) => el.id !== contactId);
    contacts.push(contact);
    await writeFile(contactsPath, JSON.stringify(contact, undefined, 2));
    return true;
  } else {
    return false;
  }
};

const addContact = async (body) => {
  const { id, name, email, phone } = body;
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contactName = contacts.some((el) => el.name === name);
  if (contactName) {
    return { message: "This contact already exists on the server" };
  } else {
    contacts.push({ id: id, name: name, email: email, phone: phone });
    await writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  }
};

const updateContact = async (contactId, body) => {
  const content = await readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(content);
  const contact = contacts.find((el) => el.id === contactId);

  if (contact) {
    const { id, name, email, phone } = contact;
    const contactAll = contacts.filter((el) => el.id !== contactId);
    console.log(contactAll);
    contactAll.push({
      id,
      name: body.name ? body.name : name,
      email: body.email ? body.email : email,
      phone: body.phone ? body.phone : phone,
    });
    await writeFile(contactsPath, JSON.stringify(contactAll, undefined, 2));
    return {
      status: "success",
      code: 200,
    };
  } else {
    return {
      status: "success",
      code: 404,
      message: "Not found",
    };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
