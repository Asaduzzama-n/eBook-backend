import { Model, Types } from 'mongoose';

export type authorName = {
  firstName: string;
  lastName?: string;
};

export type authorImage = {
  publicId: string;
  url: string;
};
export type IAuthor = {
  name: authorName;
  email: string;
  bio: string;
  address: string;
  bookPublished?: Types.ObjectId[];
  image?: authorImage;
};

export type AuthorModel = Model<IAuthor>;

export type IAuthorFilters = {
  searchTerm?: string;
  email?: string;
  address?: string;
};
