import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IReview, IReviewResponse } from './review.interface';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

// const getAllReview = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const paginationOptions = pick(req.query, paginationFields);
//   const result = await ReviewService.getAllReview(paginationOptions, id);

//   sendResponse<IReview[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Review retrieved successfully!',
//     meta: result.meta,
//     data: result.data,
//   });
// });

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReviewService.getAllReview(paginationOptions, id);

  sendResponse<IReviewResponse | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewService.getSingleReview(id);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully!',
    data: result,
  });
});

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;

  const result = await ReviewService.createReview(reviewData);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully!',
    data: result,
  });
});
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await ReviewService.updateReview(id, updatedData);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully!',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewService.deleteReview(id);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully!',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getSingleReview,
  getAllReview,
  deleteReview,
  updateReview,
};
