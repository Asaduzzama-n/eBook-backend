import { Schema, model } from 'mongoose';
import { BookModel, IBook, bookAuthor, bookPublisher } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    ebookId: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: [
        {
          _id: false,
          name: String,
        },
      ],
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    publisher: {
      _id: false,
      type: {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    edition: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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

export const Book = model<IBook, BookModel>('Book', bookSchema);
