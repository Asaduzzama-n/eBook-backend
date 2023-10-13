import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IEbookContent } from './bookContent.interface';
import { EbookContent } from './bookContent.model';

const updateBookContent = async (
  id: string,
  updatedBookContent: Partial<IEbookContent>,
): Promise<IEbookContent | null> => {
  const isExist = await EbookContent.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book content not found!');
  }
  const result = await EbookContent.findOneAndUpdate(
    { _id: id },
    updatedBookContent,
    { new: true },
  );

  return result;
};

export const BookContentService = {
  updateBookContent,
};
