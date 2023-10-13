import { Model, Types } from 'mongoose';
import { IEbook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export type IReview = {
  rating: number;
  comment: string;
  book: Types.ObjectId | IEbook;
  user: Types.ObjectId | IUser;
};

export type ReviewModel = Model<IReview>;
