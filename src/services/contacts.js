import { Contact } from '../models/contact.modal.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error('Failed to retrieve contacts', error);
  }
};

export const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw new Error('Failed to retrieve contact', error);
  }
};
