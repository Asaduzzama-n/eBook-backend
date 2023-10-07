import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import catchAsync from '../../../shared/catchAsync';

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

export const AuthController = {
  createUser,
};
