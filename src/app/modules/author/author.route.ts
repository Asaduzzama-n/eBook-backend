import express from 'express';
import { AuthorValidation } from './author.validation';
import { AuthorController } from './author.controller';
import validateRequest from '../../middleware/validateRequest';
import { upload } from '../../middleware/multer.middleware';

const router = express.Router();

router.get('/:id', AuthorController.getSingleAuthor);
router.patch(
  '/:id',
  upload.single('avatar'),
  validateRequest(AuthorValidation.updateAuthorZodSchema),
  AuthorController.updateAuthor,
);
router.delete('/:id', AuthorController.deleteAuthor);

router.post(
  '/',
  upload.single('avatar'),
  validateRequest(AuthorValidation.createAuthorZodSchema),
  AuthorController.createAuthor,
);
router.get('/', AuthorController.getAllAuthor);

export const AuthorRoutes = router;
