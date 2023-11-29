import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';

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
export const AuthRoutes = router;
