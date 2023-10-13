import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();
router.get('/:id', ReviewController.getSingleReview);
router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview,
);
router.delete('/:id', ReviewController.deleteReview);
router.post(
  '/',
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);
router.get('/', ReviewController.getAllReview);

export const ReviewRoutes = router;
