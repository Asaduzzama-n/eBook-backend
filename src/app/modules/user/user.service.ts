import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  deleteResourcesFromCloudinary,
  updateCloudniaryFiles,
  uploadToCloudinary,
} from '../../../utils/cloudinary';

import bcrypt from 'bcrypt';
import config from '../../../config';

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return user;
};

const getAllUser = async (): Promise<IUser[] | null> => {
  const user = await User.find({});
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return user;
};

const getMyProfile = async (
  email: string,
  role: string,
): Promise<IUser | null> => {
  const user = await User.findOne({
    email: email,
    role: role as 'admin' | 'user',
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return user;
};

const updateMyProfile = async (
  email: string,
  role: string,
  payload: Partial<IUser>,
  avatar: Express.Multer.File | undefined,
): Promise<IUser | null> => {
  // console.log(payload);
  const isExist = await User.findOne({
    email: email,
    role: role as 'admin' | 'user',
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, password, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );
    updatedUserData.password = hashedPassword;
  }

  let updatedAvatar;
  if (avatar) {
    if (isExist?.image?.publicId) {
      updatedAvatar = await updateCloudniaryFiles(
        isExist?.image?.publicId,
        avatar?.path,
        'image',
        true,
        'users',
      );
    } else {
      updatedAvatar = await uploadToCloudinary(avatar?.path, 'users', 'image');
    }
    updatedUserData.image = updatedAvatar!;
  }
  const result = await User.findOneAndUpdate(
    { email: email },
    updatedUserData,
    {
      new: true,
    },
  );
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, password, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );
    updatedUserData.password = hashedPassword;
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const { image } = isExist;

  if (image?.publicId) {
    await deleteResourcesFromCloudinary([image?.publicId], 'image', true);
  }

  const result = await User.findOneAndDelete({ _id: id });
  return result;
};

export const UserServices = {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
