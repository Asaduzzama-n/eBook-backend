import { Model, Types } from 'mongoose';
import { IEbook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export type IWishList = {
  book: Types.ObjectId | IEbook;
  user: Types.ObjectId | IUser;
};
export type wishListModel = Model<IWishList>;
