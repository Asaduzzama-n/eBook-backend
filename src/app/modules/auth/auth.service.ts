import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(payload);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
  }
  return createdUser;
};

export const AuthService = {
  createUser,
};
