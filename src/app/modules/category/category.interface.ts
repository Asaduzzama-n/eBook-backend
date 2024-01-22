import { Model } from 'mongoose';

export type ICategory = {
  category: string;
  key: string;
  parentCategory: string;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
