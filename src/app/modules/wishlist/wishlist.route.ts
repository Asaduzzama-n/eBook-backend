import express from 'express';
import { WishlistController } from './wishlist.controller';
import validateRequest from '../../middleware/validateRequest';
import { WishListValidation } from './wishlist.validation';

const router = express.Router();
router.get('/:id', WishlistController.getFromWishlist);
router.delete('/', WishlistController.deleteFromWishlist);
router.post(
  '/',
  validateRequest(WishListValidation.addToWishListZodSchema),
  WishlistController.addToWishList,
);
export const WishListRoutes = router;
