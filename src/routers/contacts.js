import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import {
  addContactSchema,
  updateContactSchema,
} from '../schema/contactSchemas.js';
import validateQuery from '../middlewares/validateQuery.js';
import { querySchema } from '../schema/contactSchemas.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(addContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.get('/', validateQuery(querySchema), ctrlWrapper(getContactsController));

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
export default router;
