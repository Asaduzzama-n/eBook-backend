import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

export const categorySchema = new Schema<ICategory, Record<string, unknown>>({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  parentCategory: {
    type: String,
    required: true,
  },
});

export const Category = model<ICategory>('Category', categorySchema);
