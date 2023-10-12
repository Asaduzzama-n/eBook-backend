import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAuthor, IAuthorFilters } from './author.interface';
import { Author } from './author.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { authorFilterableFields } from './author.constants';
import { SortOrder } from 'mongoose';

const getAllAuthor = async (
  filters: IAuthorFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAuthor[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: authorFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Author.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Author.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAuthor = async (id: string): Promise<IAuthor | null> => {
  const result = await Author.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found!');
  }
  return result;
};

const updateAuthor = async (
  id: string,
  payload: Partial<IAuthor>,
): Promise<IAuthor | null> => {
  const isExist = await Author.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found!');
  }
  const { name, ...authorData } = payload;
  const updatedAuthorData: Partial<IAuthor> = { ...authorData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      //key = firstName, lastName
      const nameKey = `name.${key}` as keyof Partial<IAuthor>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedAuthorData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Author.findOneAndUpdate({ _id: id }, updatedAuthorData, {
    new: true,
  });
  return result;
};

const createAuthor = async (payload: IAuthor): Promise<IAuthor | null> => {
  const createdBook = await Author.create(payload);
  if (!createdBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Author!');
  }
  return createdBook;
};

const deleteAuthor = async (id: string): Promise<IAuthor | null> => {
  const isExist = await Author.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found!');
  }

  const result = await Author.findOneAndDelete({ _id: id });
  return result;
};

export const AuthorService = {
  createAuthor,
  updateAuthor,
  getSingleAuthor,
  getAllAuthor,
  deleteAuthor,
};
