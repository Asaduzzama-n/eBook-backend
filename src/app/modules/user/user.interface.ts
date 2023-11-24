import { Model } from 'mongoose';

type userName = {
  firstName: string;
  lastName: string;
};

type image = {
  publicId: string;
  url: string;
};

export type IUser = {
  name: userName;
  email: string;
  password: string;
  contactNo?: string;
  address?: string;
  gender?: 'male' | 'female';
  dateOfBirth: string;
  image?: image;
};

export type UserModel = Model<IUser>;
