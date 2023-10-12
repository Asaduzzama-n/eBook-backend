import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAuthor } from './author.interface';
import { AuthorService } from './author.service';
import { Request, Response } from 'express';

const createAuthor = catchAsync(async (req: Request, res: Response) => {
  const { ...authorData } = req.body;

  const result = await AuthorService.createAuthor(authorData);

  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author created successfully!',
    data: result,
  });
});

export const AuthorController = {
  createAuthor,
  //   updateAuthor,
  //   getSingleAuthor,
  //   getAllAuthor,
  //   deleteAuthor,
};
