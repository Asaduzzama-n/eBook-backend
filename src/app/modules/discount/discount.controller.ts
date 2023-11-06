import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DiscountServices } from './discount.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IDiscount } from './discount.interface';

const applyDiscounts = catchAsync(async (req: Request, res: Response) => {
  const { discounts } = req.body;
  const result = await DiscountServices.applyDiscounts(discounts);

  sendResponse<IDiscount[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount saved successfully',
    data: result,
  });
});
const findAllDiscount = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountServices.findAllDiscount();

  sendResponse<IDiscount[] | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount retrieved successfully',
    data: result,
  });
});

const deleteDiscount = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DiscountServices.deleteDiscount(id);

  sendResponse<IDiscount | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount deleted successfully',
    data: result,
  });
});

export const DiscountController = {
  applyDiscounts,
  findAllDiscount,
  deleteDiscount,
};
