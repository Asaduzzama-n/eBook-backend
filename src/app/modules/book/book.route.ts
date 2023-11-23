import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import { upload } from '../../middleware/multer.middleware';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  upload.fields([
    {
      name: 'file',
      maxCount: 1,
    },
    {
      name: 'cover',
      maxCount: 1,
    },
    {
      name: 'quickView',
      maxCount: 1,
    },
  ]),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);
router.delete('/:id', BookController.deleteBook);

router.post(
  '/',
  upload.fields([
    {
      name: 'file',
      maxCount: 1,
    },
    {
      name: 'cover',
      maxCount: 1,
    },
    {
      name: 'quickView',
      maxCount: 1,
    },
  ]),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
