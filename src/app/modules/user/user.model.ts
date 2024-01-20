import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, IUserWithId, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

export const userSchema = new Schema<
  IUser,
  Record<string, unknown>,
  UserModel,
  IUserMethods
>(
  {
    name: {
      _id: false,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
        },
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    isSubscribe: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      _id: false,
      type: {
        publicId: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.methods.isUserExists = async (
  email: string,
): Promise<Pick<
  IUserWithId,
  '_id' | 'email' | 'role' | 'password' | 'isSubscribe' | 'name'
> | null> => {
  return await User.findOne(
    { email: email },
    { _id: 1, email: 1, role: 1, password: 1, isSubscribe: 1, name: 1 },
  ).lean();
};

userSchema.methods.isPasswordMatched = async (
  givenPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, hashedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
