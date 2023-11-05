import { Schema, model } from 'mongoose';
import { DiscountModel, IDiscount } from './discount.interface';

export const discountSchema = new Schema<IDiscount, Record<string, never>>(
  {
    book: {
      type: Schema.ObjectId,
      required: true,
      ref: 'Ebook',
    },
    discount_rate: {
      type: Number,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Discount = model<IDiscount, DiscountModel>(
  'Discount',
  discountSchema,
);
