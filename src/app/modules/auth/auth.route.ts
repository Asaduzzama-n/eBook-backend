import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';

import { ENUM_USER_ROLE } from '../../../enum/user';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodValidation),
  AuthController.refreshToken,
);

router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post(
  '/change-password',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  AuthController.changePassword,
);

export const AuthRoutes = router;
