import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  deleteResourcesFromCloudinary,
  updateCloudniaryFiles,
  uploadToCloudinary,
} from '../../../utils/cloudinary';

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

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
  avatar: Express.Multer.File | undefined,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
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
};
