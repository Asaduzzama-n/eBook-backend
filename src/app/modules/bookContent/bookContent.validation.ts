import { z } from 'zod';

const updateBookContentZodSchema = z.object({
  body: z.object({
    book: z.string().optional(),
  }),
});

export const BookContentValidation = {
  updateBookContentZodSchema,
};
