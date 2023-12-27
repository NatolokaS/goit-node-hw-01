const fs = require('node:fs/promises');
const path = require('node:path');

let contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function readfile(){
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writefile(contacts){
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
    // Повертає масив контактів.
    const contacts = await readfile();
    return contacts;
}

async function getContactById(id) {
    // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await readfile();
    const contact = contacts.find((contact) => contact.id === id);
    return contact;
}

async function removeContact(id) {
    // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

  await writefile(newContacts);

  return contacts[index];
}

async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };

  contacts.push(newContact);

  await writefile(contacts);

  return newContact;
}

async function updateContact(id, contact) {
    // Повертає об'єкт доданого контакту. 
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
        return undefined;
    }
    const newContact = { ...contact, id };
    contacts[index] = newContact;
    await writefile(contacts);
    return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};