import { Schema, model } from 'mongoose';
import { EbookModel, IEbook } from './book.interface';

const bookSchema = new Schema<IEbook, Record<string, never>>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    language: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    bookDescription: {
      type: String,
      required: true,
    },
    author: {
      _id: false,
      type: {
        author1: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Author',
        },
        author2: {
          type: Schema.Types.ObjectId,
          ref: 'Author',
        },
        author3: {
          type: Schema.Types.ObjectId,
          ref: 'Author',
        },
      },
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    categoryName: {
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
    version: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    bookUrl: {
      _id: false,
      select: 0,
      type: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    coverImg: {
      _id: false,
      type: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    quickViewUrl: {
      _id: false,

      type: {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    tags: [
      {
        type: String,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Ebook = model<IEbook, EbookModel>('Ebook', bookSchema);
