import express, { NextFunction, Request, Response } from 'express';
import { AuthorValidation } from './author.validation';
import { AuthorController } from './author.controller';
import validateRequest from '../../middleware/validateRequest';
import { upload } from '../../middleware/multer.middleware';
import { ENUM_USER_ROLE } from '../../../enum/user';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.get('/:id', AuthorController.getSingleAuthor);

router.patch(
  '/:id',
  upload.single('avatar'),
  // auth(ENUM_USER_ROLE.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AuthorValidation.updateAuthorZodSchema.parse(
      JSON.parse(req.body?.data),
    );
    return AuthorController.updateAuthor(req, res, next);
  },
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AuthorController.deleteAuthor,
);

router.post(
  '/',
  upload.single('avatar'),
  // auth(ENUM_USER_ROLE.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AuthorValidation.createAuthorZodSchema.parse(
      JSON.parse(req.body.data),
    );
    return AuthorController.createAuthor(req, res, next);
  },
);
router.get('/', AuthorController.getAllAuthor);

export const AuthorRoutes = router;
