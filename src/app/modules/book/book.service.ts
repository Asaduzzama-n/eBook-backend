import httpStatus from 'http-status';
import { IBook } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(payload);
  if (!createdBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Book!');
  }
  return createdBook;
};

export const BookService = {
  createBook,
};
