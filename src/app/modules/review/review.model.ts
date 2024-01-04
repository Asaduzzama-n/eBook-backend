import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

export const reviewSchema = new Schema<IReview>({
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isHelpful: {
    type: Number,
  },
  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Ebook',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const Review = model<IReview, ReviewModel>('Review', reviewSchema);
