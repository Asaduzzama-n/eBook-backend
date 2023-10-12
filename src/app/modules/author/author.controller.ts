import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAuthor } from './author.interface';
import { AuthorService } from './author.service';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { authorFilterableFields } from './author.constants';
import { paginationFields } from '../../../constants/pagination';

const getAllAuthor = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, authorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AuthorService.getAllAuthor(filters, paginationOptions);

  sendResponse<IAuthor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAuthor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AuthorService.getSingleAuthor(id);

  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author retrieved successfully!',
    data: result,
  });
});

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

const updateAuthor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedData } = req.body;

  const result = await AuthorService.updateAuthor(id, updatedData);

  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author updated successfully!',
    data: result,
  });
});

const deleteAuthor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AuthorService.deleteAuthor(id);

  sendResponse<IAuthor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author deleted successfully!',
    data: result,
  });
});

export const AuthorController = {
  createAuthor,
  updateAuthor,
  getSingleAuthor,
  getAllAuthor,
  deleteAuthor,
};
