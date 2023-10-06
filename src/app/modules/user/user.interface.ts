import { Model } from 'mongoose';

type userName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: userName;
  email: string;
  password: string;
  contactNo?: string;
  address?: string;
  gender?: 'male' | 'female';
  dateOfBirth: string;
  image?: string;
};

export type UserModel = Model<IUser>;
