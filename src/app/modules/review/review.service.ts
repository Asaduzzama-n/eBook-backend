import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IReview, IReviewResponse } from './review.interface';
import { Review } from './review.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

// const getAllReview = async (
//   paginationOptions: IPaginationOptions,
//   id: string,
// ): Promise<IGenericResponse<IReview[] | null>> => {
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const sortConditions: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const result = await Review.find({ book: id })
//     .populate('user')
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await Review.countDocuments({});
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

const getAllReview = async (
  paginationOptions: IPaginationOptions,
  id: string,
): Promise<IGenericResponse<IReviewResponse>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const reviews = await Review.find({ book: id })
    .populate({ path: 'user', select: 'name' })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments({ book: id });

  // Calculate average rating
  const avgRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / total;

  // Calculate counts and percentages for each star rating
  const ratingCounts: { [key: number]: { count: number; percentage: number } } =
    {};
  for (let i = 1; i <= 5; i++) {
    const count = reviews.filter(review => review.rating === i).length;
    const percentage = (count / total) * 100;
    ratingCounts[i] = { count, percentage };
  }

  const numberOfPages = Math.ceil(total / limit);

  const result: IGenericResponse<IReviewResponse> = {
    meta: {
      page,
      limit,
      total,
      currentPage: page,
      numberOfPages,
    },
    data: { reviews, avgRating, ratingCounts, total },
  };

  return result;
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
