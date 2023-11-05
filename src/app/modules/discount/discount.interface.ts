import { Model, Types } from 'mongoose';
import { IEbook } from '../book/book.interface';

export type IDiscount = {
  book: Types.ObjectId | IEbook;
  discount_rate: number;
  start: Date;
  end: Date;
};

export type DiscountModel = Model<IDiscount>;
