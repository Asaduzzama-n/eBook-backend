import express from 'express';
import { WishlistController } from './wishlist.controller';
import validateRequest from '../../middleware/validateRequest';
import { WishListValidation } from './wishlist.validation';
import { auth } from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';

const router = express.Router();
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  WishlistController.getFromWishlist,
);
router.delete(
  '/',
  auth(ENUM_USER_ROLE.USER),
  WishlistController.deleteFromWishlist,
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(WishListValidation.addToWishListZodSchema),
  WishlistController.addToWishList,
);
export const WishListRoutes = router;
