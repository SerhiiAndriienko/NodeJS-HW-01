const uniqid = require("uniqid");

const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error while reading or writing contacts data:", error);
    return null;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const oneContact = contacts.find((contact) => contact.id === contactId);
    return oneContact || null;
  } catch (error) {
    console.error("Error while reading or writing contacts data:", error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (removedContact) {
      contacts = contacts.filter((contact) => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error while reading or writing contacts data:", error);
    return null;
  }
};
const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const newContact = {
      id: uniqid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error while reading or writing contacts data:", error);
    return null;
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
