import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IEbookContent } from './bookContent.interface';
import httpStatus from 'http-status';
import { BookContentService } from './bookContent.service';

const updateBookContent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updatedBookContent } = req.body;

  const result = await BookContentService.updateBookContent(
    id,
    updatedBookContent,
  );

  sendResponse<IEbookContent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book content updated successfully!',
    data: result,
  });
});

export const BookContentController = {
  updateBookContent,
};
