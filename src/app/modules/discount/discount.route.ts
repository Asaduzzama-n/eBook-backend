import express from 'express';
import { DiscountController } from './discount.controller';
import validateRequest from '../../middleware/validateRequest';
import { DiscountValidation } from './discount.validation';

const router = express.Router();
router.delete('/:id', DiscountController.deleteDiscount);
router.patch(
  '/',
  validateRequest(DiscountValidation.applyDiscountZodSchema),
  DiscountController.applyDiscounts,
);
router.get('/', DiscountController.findAllDiscount);

export const DiscountRoutes = router;
