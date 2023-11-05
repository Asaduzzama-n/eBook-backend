import express from 'express';
import { DiscountController } from './discount.controller';
import validateRequest from '../../middleware/validateRequest';
import { DiscountValidation } from './discount.validation';

const router = express.Router();

router.patch(
  '/',
  validateRequest(DiscountValidation.applyDiscountZodSchema),
  DiscountController.applyDiscounts,
);

export const DiscountRoutes = router;
