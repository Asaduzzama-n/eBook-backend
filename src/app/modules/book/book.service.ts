import httpStatus from 'http-status';
import { IEbook, IEbookFilters, commonFileStore } from './book.interface';
import { Ebook } from './book.model';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { bookFilterableFields } from './book.constants';
import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';

import bcrypt from 'bcrypt';
import {
  deleteResourcesFromCloudinary,
  updateCloudniaryFiles,
  uploadToCloudinary,
} from '../../../utils/cloudinary';
import config from '../../../config';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateBook = async (
  id: string,
  payload: Partial<IEbook>,
  files: any,
): Promise<IEbook | null> => {
  const isExist = await Ebook.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found!');
  }
  const { bookUrl, coverImg, quickViewUrl } = isExist;
  const { author, publisher, ...bookData } = payload;
  const updatedBookData: Partial<IEbook> = { ...bookData };

  let updatedFileData: commonFileStore,
    updatedCoverData: commonFileStore,
    updatedQuickViewData: commonFileStore;

  if (files && Object.keys(files).length > 0) {
    if (files.file) {
      updatedFileData = await updateCloudniaryFiles(
        bookUrl?.publicId as string,
        files?.file[0].path,
        'raw',
        true,
        'contents',
      );
      updatedBookData.bookUrl = updatedFileData;
    }
    if (files.cover) {
      updatedCoverData = await updateCloudniaryFiles(
        coverImg?.publicId as string,
        files?.cover[0].path,
        'raw',
        true,
        'covers',
      );
      updatedBookData.coverImg = updatedCoverData;
    }
    if (files.quickView) {
      updatedQuickViewData = await updateCloudniaryFiles(
        quickViewUrl?.publicId as string,
        files?.quickView[0].path,
        'raw',
        true,
        'qviews',
      );
      updatedBookData.quickViewUrl = updatedQuickViewData;
    }
  }

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

const deleteBook = async (id: string): Promise<IEbook | null> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isExist = await Ebook.findOne({ _id: id });
    if (!isExist) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Book not found!');
    }
    const { bookUrl, coverImg, quickViewUrl } = isExist;

    //Delete book cover,and content from cloudinary
    if (bookUrl?.publicId || quickViewUrl?.publicId || coverImg?.publicId) {
      await deleteResourcesFromCloudinary(
        [
          bookUrl?.publicId as string,
          quickViewUrl?.publicId as string,
          coverImg?.publicId as string,
        ],
        'raw',
        true,
      );
    }

    const result = await Ebook.findOneAndDelete({ _id: id }, { session });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete book!');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const createBook = async (
  cover: any,
  file: any,
  quickView: any,
  payload: IEbook,
): Promise<IEbook | null> => {
  const { price, author, ...bookData } = payload;

  const convertedBookData: Partial<IEbook> = {
    ...bookData,
    price: Number(price),
    author: author,
  };
  let newBookAllData = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let uploadBookCover: any, uploadBookContent: any, uploadQuickViewFile: any;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (!cover || !quickView || !file) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Book Cover, Quick view and Content is required!',
      );
    }

    uploadBookCover = await uploadToCloudinary(cover[0]?.path, 'covers', 'raw');

    uploadBookContent = await uploadToCloudinary(
      file[0]?.path,
      'contents',
      'raw',
    );

    uploadQuickViewFile = await uploadToCloudinary(
      quickView[0]?.path,
      'qviews',
      'raw',
    );

    if (!uploadQuickViewFile || !uploadBookContent || !uploadBookCover) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload File !');
    }

    convertedBookData.coverImg = uploadBookCover;
    convertedBookData.bookUrl = uploadBookContent;
    convertedBookData.quickViewUrl = uploadQuickViewFile;

    const newBook = await Ebook.create([convertedBookData], { session });

    if (!newBook.length) {
      await deleteResourcesFromCloudinary(
        [
          uploadBookCover?.publicId,
          uploadBookContent?.publicId,
          uploadQuickViewFile?.publicId,
        ],
        'raw',
        true,
      );
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create book!');
    }
    newBookAllData = newBook[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    if (uploadBookCover || uploadBookContent || uploadQuickViewFile) {
      await deleteResourcesFromCloudinary(
        [
          uploadBookCover?.publicId,
          uploadBookContent?.publicId,
          uploadQuickViewFile?.publicId,
        ],
        'raw',
        true,
      );
    }
    throw error;
  }

  if (newBookAllData) {
    newBookAllData = await Ebook.findOne({ _id: newBookAllData.id }).populate(
      'author',
    );
  }

  return newBookAllData;
};

export const BookService = {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
  getAllBooks,
};
