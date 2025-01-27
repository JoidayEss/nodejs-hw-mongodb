import { Contact } from '../models/contact.model.js';

export const getAllContacts = async (userId, { page, perPage }) => {
  const limit = parseInt(perPage, 10);
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId });

  const totalItems = await Contact.find({ userId }).countDocuments();
  const contacts = await contactsQuery.skip(skip).limit(limit);

  return { contacts, totalItems };
};

export const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const addContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (userId, contactId, updateData) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true, runValidators: true },
  );
};

export const deleteContact = async (userId, contactId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
