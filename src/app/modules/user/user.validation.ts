import { z } from 'zod';
import { userGender } from './user.constants';

const userUpdateZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    gender: z.enum([...userGender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const UserValidation = {
  userUpdateZodSchema,
};
