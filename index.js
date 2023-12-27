const { program } = require("commander");
const Contacts = require('./contacts.js');

const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case 'list':
          const contacts = await Contacts.listContacts();
          return console.log(contacts);
      break;
      case 'get':
          const contact = await Contacts.getContactById(id);
          return console.log(contact);
      break;
      case 'add':
          const createdContact = await Contacts.addContact( { name, email, phone } );
          return console.log(createdContact);
          break;
      case 'update':
          const updatedContact = await Contacts.updateContact( id, { name, email, phone } );
          return console.log(updatedContact);
      break;
      case 'remove':
          const removedContact = await Contacts.removeContact(id);
          return console.log(removedContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

//
// const { Command } = require('commander');
// const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

// const argv = program.opts();

// // TODO: рефакторити
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case 'list':
//       // ...
//       break;

//     case 'get':
//       // ... id
//       break;

//     case 'add':
//       // ... name email phone
//       break;

//     case 'remove':
//       // ... id
//       break;

//     default:
//       console.warn('\x1B[31m Unknown action type!');
//   }
// }

// invokeAction(argv);