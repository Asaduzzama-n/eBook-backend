import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (
  payload: ICategory,
): Promise<ICategory | null> => {
  const { category, parentCategory } = payload;
  const key =
    encodeURIComponent(
      category.replace(/\s/g, '-').replace(/&/g, 'and'),
    ).toLowerCase() +
    '-' +
    Date.now().toString().slice(-3);

  const finalCategory = {
    category,
    key,
    parentCategory,
  };

  const result = await Category.create(finalCategory);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create category');
  }
  return result;
};

const getAllCategory = async (): Promise<ICategory[] | null> => {
  const result = await Category.find({});
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieved category');
  }
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await Category.findOneAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete category');
  }
  return result;
};
export const CategoryServices = {
  createCategory,
  deleteCategory,
  getAllCategory,
};
