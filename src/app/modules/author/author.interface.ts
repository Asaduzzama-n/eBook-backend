import { Model } from 'mongoose';

export type authorName = {
  firstName: string;
  lastName?: string;
};
export type IAuthor = {
  name: authorName;
  email: string;
  bio: string;
  address: string;
  bookPublished?: number;
  image?: string;
};

export type AuthorModel = Model<IAuthor>;

export type IAuthorFilters = {
  searchTerm?: string;
  email?: string;
  address?: string;
};
