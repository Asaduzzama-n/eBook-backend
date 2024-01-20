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
  role: string;
  isSubscribe: true | false;
};

export interface IUserWithId extends IUser {
  _id: string;
}

export interface IUserMethods {
  isUserExists(
    email: string,
  ): Promise<Pick<
    IUserWithId,
    '_id' | 'email' | 'role' | 'password' | 'isSubscribe' | 'name'
  > | null>;

  isPasswordMatched(
    givenPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
