import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();
router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);
router.delete('/:id', BookController.deleteBook);

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
