import { z } from 'zod';

const createCategoryValidation = z.object({
  body: z.object({
    category: z.string({ required_error: 'Category name is required' }),
    parentCategory: z.string({
      required_error: 'Parent Category  is required!',
    }),
  }),
});

export const CategoryValidation = { createCategoryValidation };
