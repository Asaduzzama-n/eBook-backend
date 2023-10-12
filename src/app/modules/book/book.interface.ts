import { Model, Types } from 'mongoose';
import { IEbookContent } from '../bookContent/bookContent.interface';

export type bookAuthor = {
  author1: Types.ObjectId;
  author2?: Types.ObjectId;
  author3?: Types.ObjectId;
};
export type bookPublisher = {
  name: string;
  address: string;
};
export type IEbook = {
  title: string;
  ebookId?: Types.ObjectId | IEbookContent;
  isbn: string;
  bookDescription: string;
  author: bookAuthor;
  category: string;
  publicationYear: string;
  publisher: bookPublisher;
  edition: string;
  price: number;
};

export type EbookModel = Model<IEbook>;

export type IEbookFilters = {
  searchTerm?: string;
  minPrice: number;
  maxPrice: number;
  title?: string;
  category?: string;
  isbn?: string;
};
