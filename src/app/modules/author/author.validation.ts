import { z } from 'zod';

const createAuthorZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First name is required!' }),
      lastName: z.string().optional(),
    }),
    email: z.string({ required_error: 'Email is required!' }).email(),
    address: z.string({ required_error: 'Address is required!' }),
    bookPublished: z.string().optional(),
    image: z.string().optional(),
  }),
});

const updateAuthorZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    bookPublished: z.number().int().optional(),
    image: z.string().optional(),
  }),
});

export const AuthorValidation = {
  createAuthorZodSchema,
  updateAuthorZodSchema,
};
