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
    role: z.string({ required_error: 'User role is required!' }),
    isSubscribe: z.string().optional(),
  }),
});

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
    // password: z.string().optional(),
  }),
});

const refreshTokenZodValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  userLoginZodSchema,
  refreshTokenZodValidation,
};
