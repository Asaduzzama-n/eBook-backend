import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

export const BookRoutes = router;
