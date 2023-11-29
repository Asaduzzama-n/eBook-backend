import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  IRefreshTokenResponse,
  IUserLogin,
  IUserLoginResponse,
} from './auth.interface';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelper';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(payload);
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
  }
  return createdUser;
};

const loginUser = async (
  payload: IUserLogin,
): Promise<IUserLoginResponse | null> => {
  const { email, password } = payload;
  const userObj = new User();

  const isUserExist = await userObj.isUserExists(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!');
  }

  const isPasswordMatched = await userObj.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
  }

  const accessToken = jwtHelpers.createToken(
    {
      email: email,
      role: isUserExist.role,
      isSubscribe: isUserExist.isSubscribe,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    {
      email: email,
      role: isUserExist.role,
      isSubscribe: isUserExist.isSubscribe,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (
  token: string,
): Promise<IRefreshTokenResponse | null> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  const userObj = new User();
  const isUserExist = await userObj.isUserExists(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      isSubscribe: isUserExist.isSubscribe,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
