import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IReview } from './review.interface';
import { Review } from './review.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

const getAllReview = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IReview[] | null>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Review.find({})
    .populate('book')
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments({});
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findOne({ _id: id })
    .populate('book')
    .populate('user');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found!');
  }
  return result;
};

const createReview = async (payload: IReview): Promise<IReview | null> => {
  const createdReview = await Review.create(payload);
  if (!createdReview) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Review!');
  }
  return createdReview;
};

const updateReview = async (
  id: string,
  updatedData: Partial<IReview>,
): Promise<IReview | null> => {
  const isExist = await Review.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  const result = await Review.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteReview = async (id: string): Promise<IReview | null> => {
  const isExist = await Review.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found!');
  }

  const result = await Review.findOneAndDelete({ _id: id });
  return result;
};

export const ReviewService = {
  createReview,
  getSingleReview,
  getAllReview,
  deleteReview,
  updateReview,
};
