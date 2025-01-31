import mongoose from 'mongoose';
import {
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  getPaginatedContacts,
} from '../services/contacts.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import createError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

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
      userId: req.user._id,
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
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(createError(400, 'Invalid contact ID format'));
    }

    const contact = await getContactById(contactId, req.user._id);

    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
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
      userId: req.user._id,
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
    const photo = req.file;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(createError(400, 'Invalid contact ID format'));
    }

    if (Object.keys(updateData).length === 0 && !photo) {
      return next(createError(400, 'No fields to update provided'));
    }

    let photoUrl;

    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const updatedContact = await updateContact(contactId, {
      ...updateData,
      ...(photoUrl && { photo: photoUrl }),
    });

    if (!updatedContact) {
      return next(
        createError(404, 'Contact not found or you do not have permission'),
      );
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

    const deletedContact = await deleteContact(contactId, req.user._id);

    if (!deletedContact) {
      return next(
        createError(404, 'Contact not found or you do not have permission'),
      );
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
