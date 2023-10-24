import { z } from 'zod';

const addToWishListZodSchema = z.object({
  body: z.object({
    book: z.string({ required_error: 'Book Id is required!' }),
    user: z.string({ required_error: 'User Id is required!' }),
  }),
});

export const WishListValidation = {
  addToWishListZodSchema,
};
