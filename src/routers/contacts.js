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
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  isValidId,
  upload.single('photo'),
  validateBody(addContactSchema),
  ctrlWrapper(addContactController),
);

router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(addContactSchema),
  ctrlWrapper(patchContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.get('/', validateQuery(querySchema), ctrlWrapper(getContactsController));

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

export default router;
