const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list": {
      const allContacts = await listContacts();
      console.log(allContacts);
      break;
    }
    case "get": {
      const oneContact = await getContactById(id);
      console.log(oneContact);
      break;
    }
    case "remove": {
      const oneContact = await removeContact(id);
      console.log(oneContact);
      break;
    }
    case "add": {
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    }
    default: {
      console.warn("\x1B[31m Unknown action type!");
    }
  }
};

program
  .option("-a, --action, <type>")
  .option("-i --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");
program.parse();

const options = program.opts();
invokeAction(options);
