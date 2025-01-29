import { Contact } from '../models/contact.model.js';

export const getPaginatedContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filters = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const query = { userId };

  if (filters.contactType) {
    query.contactType = filters.contactType;
  }
  if (filters.isFavourite !== undefined) {
    query.isFavourite = filters.isFavourite;
  }

  const totalItems = await Contact.countDocuments(query);

  const contacts = await Contact.find(query)
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactById = async (contactId, userId) => {
  return Contact.findOne({ _id: contactId, userId });
};

export const addContact = async (contactData) => {
  return Contact.create(contactData);
};

export const updateContact = async (contactId, updateData, userId) => {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (contactId, userId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};
