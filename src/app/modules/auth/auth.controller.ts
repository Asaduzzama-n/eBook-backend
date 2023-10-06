import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body;
    const result = await AuthService.createUser(userData);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  createUser,
};
