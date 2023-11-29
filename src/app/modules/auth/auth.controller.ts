import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import catchAsync from '../../../shared/catchAsync';
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.createUser(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userLoginData } = req.body;
  const result = await AuthService.loginUser(userLoginData);

  const { refreshToken, ...others } = result as IUserLoginResponse;

  const cookieOptions = {
    secure: config.env === 'production',
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
  console.log(req.cookies);

  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

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
