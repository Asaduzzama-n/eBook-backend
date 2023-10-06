import { z } from 'zod';
import { userGender } from '../user/user.constants';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required!' }),
      lastName: z.string().optional(),
    }),
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    gender: z.enum([...userGender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
};
