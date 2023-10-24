import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { WishListService } from './wishlist.service';
import sendResponse from '../../../shared/sendResponse';
import { IWishList } from './wishlist.interface';
import httpStatus from 'http-status';

const addToWishList = catchAsync(async (req: Request, res: Response) => {
  const { ...wishListData } = req.body;
  const result = await WishListService.addToWishList(wishListData);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to wishlist successfully!',
    data: result,
  });
});

const getFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await WishListService.getFromWishlist(id);

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched from wishlist successfully!',
    data: result,
  });
});

const deleteFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const { ...wishListData } = req.body;
  const result = await WishListService.deleteFromWishlist(wishListData);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted from wishlist successfully!',
    data: result,
  });
});

export const WishlistController = {
  addToWishList,
  getFromWishlist,
  deleteFromWishlist,
};
