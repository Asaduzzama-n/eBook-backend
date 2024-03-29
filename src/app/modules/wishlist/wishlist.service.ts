import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IWishList } from './wishlist.interface';
import { WishList } from './wishlist.model';

const addToWishList = async (payload: IWishList): Promise<IWishList | null> => {
  const { book, user } = payload;
  const isExist = await WishList.find({
    $and: [{ book: book }, { user: user }],
  });
  if (isExist.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already added to wishlist!');
  }
  const result = await WishList.create(payload);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to add book to wishlist!',
    );
  }
  return result;
};

const getFromWishlist = async (id: string): Promise<IWishList[] | null> => {
  const result = await WishList.find({ user: id }).populate('book', {
    title: 1,
    author: 1,
    coverImg: 1,
    quickViewUrl: 1,
    price: 1,
    sold: 1,
    categoryName: 1,
    id: 1,
    page: 1,
    isbn: 1,
    tags: 1,
  });
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No wishlist found for the user!',
    );
  }
  return result;
};

const deleteFromWishlist = async (
  payload: IWishList,
): Promise<IWishList | null> => {
  const { book, user } = payload;
  const isExist = await WishList.findOne({
    $and: [{ book: book }, { user: user }],
  });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Does not exist!');
  }
  const result = await WishList.findOneAndDelete({
    $and: [{ book: book }, { user: user }],
  });

  return result;
};

export const WishListService = {
  addToWishList,
  getFromWishlist,
  deleteFromWishlist,
};
