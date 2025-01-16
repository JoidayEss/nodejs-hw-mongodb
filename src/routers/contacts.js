import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(addContactController));
router.patch('/:contactId', ctrlWrapper(patchContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
