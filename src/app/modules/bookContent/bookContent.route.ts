import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookContentValidation } from './bookContent.validation';
import { BookContentController } from './bookContent.controller';

const router = express.Router();
router.patch(
  '/:id',
  validateRequest(BookContentValidation.updateBookContentZodSchema),
  BookContentController.updateBookContent,
);

export const BookContentRoutes = router;
