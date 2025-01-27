import express from 'express';
import validateBody from '../middlewares/validateBody.js';
import { userRegisterSchema } from '../schema/authSchemas.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { userLoginSchema } from '../schema/authSchemas.js';
import { registerController } from '../controllers/auth.js';
import { loginController } from '../controllers/auth.js';
import { refreshController } from '../controllers/auth.js';
import { logoutController } from '../controllers/auth.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(loginController),
);

router.post('/refresh', ctrlWrapper(refreshController));
router.post('/logout', ctrlWrapper(logoutController));

export default router;
