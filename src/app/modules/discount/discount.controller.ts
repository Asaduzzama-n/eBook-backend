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

export const DiscountController = {
  applyDiscounts,
};
