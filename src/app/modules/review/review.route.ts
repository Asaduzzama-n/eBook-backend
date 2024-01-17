import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
import { auth } from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';

const router = express.Router();
router.get('/book/:id', ReviewController.getAllReview);

router.get('/:id', ReviewController.getSingleReview);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.deleteReview,
);

router.post(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);

export const ReviewRoutes = router;
