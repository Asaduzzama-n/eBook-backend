import { Model, Types } from 'mongoose';

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
  isbn: string;
  bookDescription: string;
  language: string;
  author: bookAuthor;
  category: string; //holds the category key for filter
  categoryName: string;
  publicationYear: string;
  publisher: bookPublisher;
  version: string;
  price: number;
  sold: number;
  bookUrl?: commonFileStore;
  coverImg?: commonFileStore;
  quickViewUrl?: commonFileStore;
  page: string;
  readTime: string;
  tags?: string[];
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

export type commonFileStore = {
  publicId: string;
  url: string;
};
