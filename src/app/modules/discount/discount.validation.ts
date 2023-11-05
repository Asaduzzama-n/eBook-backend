import { z } from 'zod';

const applyDiscountZodSchema = z.object({
  body: z.object({
    discounts: z.array(
      z.object({
        book: z.string({ required_error: 'Book reference id is required!' }),
        discount_rate: z.number({
          required_error: 'Discount rate is required!',
        }),
        start: z.string({ required_error: 'Start date is required!' }),
        end: z.string({ required_error: 'End date is required!' }),
      }),
    ),
  }),
});

export const DiscountValidation = {
  applyDiscountZodSchema,
};
