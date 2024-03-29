import { Schema, model } from 'mongoose';
import { AuthorModel, IAuthor } from './author.interface';

export const authorSchema = new Schema<IAuthor>(
  {
    name: {
      _id: false,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
        },
      },
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    bookPublished: [{ type: Schema.Types.ObjectId, ref: 'Ebook' }],
    image: {
      _id: false,
      type: {
        publicId: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Author = model<IAuthor, AuthorModel>('Author', authorSchema);
