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
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to apply discounts!');
  }
};

const updateDiscounts = async () => {};
export const DiscountServices = {
  applyDiscounts,
};
