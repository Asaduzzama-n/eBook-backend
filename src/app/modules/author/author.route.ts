import express from 'express';
import { AuthorValidation } from './author.validation';
import { AuthorController } from './author.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.get('/:id', AuthorController.getSingleAuthor);
router.patch(
  '/:id',
  validateRequest(AuthorValidation.updateAuthorZodSchema),
  AuthorController.updateAuthor,
);
router.delete('/:id', AuthorController.deleteAuthor);

router.post(
  '/',
  validateRequest(AuthorValidation.createAuthorZodSchema),
  AuthorController.createAuthor,
);
router.get('/', AuthorController.getAllAuthor);

export const AuthorRoutes = router;
