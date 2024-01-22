import { z } from 'zod';

const createAuthorZodSchema = z.object({
  name: z.object({
    firstName: z.string({ required_error: 'First name is required!' }),
    lastName: z.string().optional(),
  }),
  email: z.string({ required_error: 'Email is required!' }).email(),
  bio: z.string({ required_error: 'Author bio is required!' }),
  address: z.string({ required_error: 'Address is required!' }),
  bookPublished: z.array(z.string()).optional(),
  image: z.string().optional(),
});

const updateAuthorZodSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  bookPublished: z.string().optional(),
  image: z.string().optional(),
});

export const AuthorValidation = {
  createAuthorZodSchema,
  updateAuthorZodSchema,
};
