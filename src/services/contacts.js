import { Contact } from '../models/contact.model.js';

export const getPaginatedContacts = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filters = {},
) => {
  const skip = (page - 1) * perPage;
  const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  const filterOptions = {};
  if (filters.type) {
    filterOptions.contactType = filters.type;
  }
  if (filters.isFavourite !== undefined) {
    filterOptions.isFavourite = filters.isFavourite === 'true';
  }

  const totalItems = await Contact.countDocuments(filterOptions);
  const contacts = await Contact.find(filterOptions)
    .sort(sortOptions)
    .skip(skip)
    .limit(perPage);

  return {
    contacts,
    totalItems,
  };
};

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const addContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
