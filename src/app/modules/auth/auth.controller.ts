import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import catchAsync from '../../../shared/catchAsync';
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const { ...userData } = req.body;
  console.log(userData);
  const result = await AuthService.createUser(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await AuthService.loginUser(
    email as string,
    password as string,
  );

  const { refreshToken, ...others } = result as IUserLoginResponse;

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User log in successful!',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);

  const result = await AuthService.refreshToken(refreshToken);

  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // };

  // res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token fetched successfully!',
    data: result,
  });
});
export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
};
