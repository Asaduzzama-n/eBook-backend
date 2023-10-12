import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAuthor } from './author.interface';
import { Author } from './author.model';

const createAuthor = async (payload: IAuthor): Promise<IAuthor | null> => {
  const createdBook = await Author.create(payload);
  if (!createdBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Author!');
  }
  return createdBook;
};

export const AuthorService = {
  createAuthor,
  //   updateAuthor,
  //   getSingleAuthor,
  //   getAllAuthor,
  //   deleteAuthor,
};
