import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  IChangePassword,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelper';
import { sendMail } from './sendResetMail';
import bcrypt from 'bcrypt';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const { email } = payload;
  const isUserExist = await User.findOne({ email: email });
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }
  const createdUser = await User.create(payload);

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
  }
  return createdUser;
};

const loginUser = async (
  email: string,
  password: string,
): Promise<IUserLoginResponse | null> => {
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
      id: isUserExist._id,
      email: email,
      role: isUserExist.role,
      isSubscribe: isUserExist.isSubscribe,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      email: email,
      role: isUserExist.role,
      isSubscribe: isUserExist.isSubscribe,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  const userData = await User.findOne(
    { _id: isUserExist?._id },
    { name: 1, email: 1, userBooks: 1, image: 1 },
  );

  return {
    userData,
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
      id: isUserExist._id,
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

const forgotPassword = async (email: string) => {
  const userObj = new User();
  const isUserExist = await userObj.isUserExists(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!');
  }

  const passwordResetToken = jwtHelpers.createPasswordResetToken(
    { email: isUserExist.email },
    config.jwt.secret as string,
    '5m',
  );

  const resetLink: string =
    config.resetPassUiLink +
    `email=${isUserExist.email}&token=${passwordResetToken}`;

  await sendMail(
    email,
    'Password reset link.',
    `
  <div>
  <p>Hi, ${isUserExist?.name.firstName}</p>
  <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
  <p>Thank you</p>
</div>`,
  );
  return {
    message: 'Check you mail',
  };
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  const { email, newPassword } = payload;
  console.log(email, newPassword, token);
  const userObj = new User();
  const isUserExist = await userObj.isUserExists(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!');
  }

  const isVerified = jwtHelpers.verifyToken(token, config.jwt.secret as string);

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  if (isVerified) {
    await User.updateOne({ email: email }, { password });
  }
};

const changePassword = async (
  user: any | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const userObj = new User();
  const isUserExist = await userObj.isUserExists(user.email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await userObj.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.updateOne(
    { email: user?.email },
    { $set: { password: newHashedPassword } },
  );
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};
