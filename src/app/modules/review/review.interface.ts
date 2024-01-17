import { Model, Types } from 'mongoose';
import { IEbook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export type IReview = {
  rating: number;
  review: string;
  title: string;
  isHelpful: number;

  helpfulVotes: number;
  unhelpfulVotes: number;
  inappropriateCount: number;
  book: Types.ObjectId | IEbook;
  user: Types.ObjectId | IUser;
};

export type IReviewResponse = {
  reviews: IReview[] | null;
  avgRating: number;
  ratingCounts: { [key: number]: { count: number; percentage: number } };
  total: number;
};

export type IReviewFilters = {
  searchTerm?: string;
  rating?: number;
};

export type ReviewModel = Model<IReview>;
