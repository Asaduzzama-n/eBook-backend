import { Model } from 'mongoose';

export type bookAuthor = {
  name: string;
};
export type bookPublisher = {
  name: string;
  address: string;
};
export type IBook = {
  title: string;
  ebookId: string;
  isbn: string;
  author: bookAuthor[];
  genre: string;
  publicationYear: string;
  publisher: bookPublisher;
  edition: string;
  price: number;
};

export type BookModel = Model<IBook>;
