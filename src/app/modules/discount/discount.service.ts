import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IDiscount } from './discount.interface';
import { Discount } from './discount.model';

const applyDiscounts = async (
  payload: IDiscount[],
): Promise<IDiscount[] | null> => {
  try {
    const result: IDiscount[] = [];
    for (const discount of payload) {
      result.push(
        await Discount.findOneAndUpdate({ book: discount.book }, discount, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }).populate('book'),
      );
    }

    return result;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error as string);
  }
};

const findAllDiscount = async (): Promise<IDiscount[] | null> => {
  const result = await Discount.find({}).populate('book');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No discount available!');
  }
  return result;
};

const deleteDiscount = async (id: string) => {
  //!currently discount id [book id can be also consider]
  const isExist = await Discount.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No discount found with the given id!',
    );
  }
  const result = await Discount.findOneAndDelete({ _id: id }).lean();
  return result;
};

export const DiscountServices = {
  applyDiscounts,
  findAllDiscount,
  deleteDiscount,
};
