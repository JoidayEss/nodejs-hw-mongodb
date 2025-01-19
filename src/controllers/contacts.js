import mongoose from 'mongoose';
import {
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  getPaginatedContacts,
} from '../services/contacts.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import createError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const filters = parseFilterParams(req.query);

    const contacts = await getPaginatedContacts({
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10),
      sortBy,
      sortOrder,
      filters,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(createError(400, 'Invalid contact ID format'));
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, contactType, email, isFavourite } = req.body;

    if (!name || !phoneNumber || !contactType) {
      return next(
        createError(
          400,
          'Missing required fields: name, phoneNumber, contactType',
        ),
      );
    }

    const newContact = await addContact({
      name,
      phoneNumber,
      contactType,
      email,
      isFavourite,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(createError(400, 'Invalid contact ID format'));
    }

    if (Object.keys(updateData).length === 0) {
      return next(createError(400, 'No fields to update provided'));
    }

    const updatedContact = await updateContact(contactId, updateData);

    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(createError(400, 'Invalid contact ID format'));
    }

    const deletedContact = await deleteContact(contactId);

    if (!deletedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
