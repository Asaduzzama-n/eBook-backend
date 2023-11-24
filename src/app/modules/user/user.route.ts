import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { upload } from '../../middleware/multer.middleware';
const router = express.Router();

router.get('/:id', UserController.getSingleUser);
router.delete('/:id', UserController.deleteUser);

router.patch(
  '/:id',
  upload.single('avatar'),
  validateRequest(UserValidation.userUpdateZodSchema),
  UserController.updateUser,
);
router.get('/', UserController.getAllUser);

export const UserRoutes = router;
