import express from 'express';
import { DiscountController } from './discount.controller';
import validateRequest from '../../middleware/validateRequest';
import { DiscountValidation } from './discount.validation';
import { ENUM_USER_ROLE } from '../../../enum/user';
import { auth } from '../../middleware/auth';

const router = express.Router();
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DiscountController.deleteDiscount,
);
router.patch(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(DiscountValidation.applyDiscountZodSchema),
  DiscountController.applyDiscounts,
);
router.get('/', DiscountController.findAllDiscount);

export const DiscountRoutes = router;
