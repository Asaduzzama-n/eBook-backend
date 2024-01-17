import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { upload } from '../../middleware/multer.middleware';
import { auth } from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';
const router = express.Router();

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getMyProfile,
);

router.patch(
  '/my-profile',
  upload.single('avatar'),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.userUpdateZodSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.updateMyProfile(req, res, next);
  },
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.deleteUser,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.userUpdateZodSchema),
  UserController.updateUser,
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);

export const UserRoutes = router;
