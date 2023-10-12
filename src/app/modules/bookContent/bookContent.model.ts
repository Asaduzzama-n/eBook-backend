import { Schema, model } from 'mongoose';
import { IEbookContent, EbookContentModel } from './bookContent.interface';

export const bookContentSchema = new Schema<IEbookContent>(
  {
    book: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const EbookContent = model<IEbookContent, EbookContentModel>(
  'EbookContent',
  bookContentSchema,
);
