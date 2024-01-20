import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';

const getUserPurchase = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user!;
  const result = await UserServices.getUserPurchase(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchased history retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserServices.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUser();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { email, role } = req.user!;
  const result = await UserServices.getMyProfile(email, role);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully!',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const avatar = req?.file as Express.Multer.File;
  const { email, role } = req.user!;
  const { ...updatedData } = req.body;
  console.log(req.file, req.body);
  const result = await UserServices.updateMyProfile(
    email,
    role,
    updatedData,
    avatar,
  );

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;
  const result = await UserServices.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserServices.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  getUserPurchase,
};
