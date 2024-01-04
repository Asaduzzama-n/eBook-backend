import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    rating: z.number({ required_error: 'Rating is required!' }),
    review: z.string({ required_error: 'Review comment is required!' }),
    title: z.string({ required_error: 'Review title is required!' }),
    book: z.string({ required_error: 'Book id is required!' }),
    user: z.string({ required_error: 'User id is required!' }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    rating: z.number().optional(),
    comment: z.string().optional(),
    book: z.string().optional(),
    user: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
