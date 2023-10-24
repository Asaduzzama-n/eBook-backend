import { Schema, model } from 'mongoose';
import { IWishList, wishListModel } from './wishlist.interface';

const wishListSchema = new Schema<IWishList>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'EbookContent',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const WishList = model<IWishList, wishListModel>(
  'WishList',
  wishListSchema,
);
