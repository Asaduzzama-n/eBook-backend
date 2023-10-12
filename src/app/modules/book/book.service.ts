import httpStatus from 'http-status';
import { IEbook, IEbookFilters } from './book.interface';
import { Ebook } from './book.model';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { bookFilterableFields } from './book.constants';
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';

const getAllBooks = async (
  filters: Partial<IEbookFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEbook[] | null>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    if (minPrice !== undefined) {
      andConditions.push({ price: { $gte: minPrice } });
    }
    if (maxPrice !== undefined) {
      andConditions.push({ price: { $lte: maxPrice } });
    }
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
  const result = await Ebook.find(whereConditions)
    .populate('author.author1')
    .populate('author.author2')
    .populate('author.author3')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Ebook.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IEbook | null> => {
  const retrievedBook = await Ebook.findOne({ _id: id })
    .populate('author.author1')
    .populate('author.author2')
    .populate('author.author3');
  if (!retrievedBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not found!');
  }
  return retrievedBook;
};

const updateBook = async (
  id: string,
  payload: Partial<IEbook>,
): Promise<IEbook | null> => {
  const isExist = await Ebook.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }

  const { author, publisher, ...bookData } = payload;
  const updatedBookData: Partial<IEbook> = { ...bookData };

  if (author && Object.keys(author).length > 0) {
    Object.keys(author).forEach(key => {
      //key = author1,author2,author3
      const authorKey = `author.${key}` as keyof Partial<IEbook>; // author.author1, author.author2
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedBookData as any)[authorKey] = author[key as keyof typeof author];
    });
  }

  if (publisher && Object.keys(publisher).length > 0) {
    Object.keys(publisher).forEach(key => {
      //key = name,address
      const publisherKey = `publisher.${key}` as keyof Partial<IEbook>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updatedBookData as any)[publisherKey] =
        publisher[key as keyof typeof publisher];
    });
  }

  const result = await Ebook.findOneAndUpdate({ _id: id }, updatedBookData, {
    new: true,
  });

  return result;
};

const createBook = async (payload: IEbook): Promise<IEbook | null> => {
  const createdBook = await Ebook.create(payload);
  if (!createdBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Book!');
  }
  return createdBook;
};

const deleteBook = async (id: string): Promise<IEbook | null> => {
  const isExist = await Ebook.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book not found!');
  }
  const deletedBook = await Ebook.findOneAndDelete({ _id: id });
  if (!deletedBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book deleted successfully!');
  }
  return deletedBook;
};

export const BookService = {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
  getAllBooks,
};

//6527c6087c07ca33ef5781fb
//65282643602977a9bbbab138
//6528264e602977a9bbbab13a
