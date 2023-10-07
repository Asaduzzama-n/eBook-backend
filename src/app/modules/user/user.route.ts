import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get('/:id', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.userUpdateZodSchema),
  UserController.updateUser,
);
router.get('/', UserController.getAllUser);

export const UserRoutes = router;
