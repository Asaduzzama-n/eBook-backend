import { NextFunction, Request, Response } from 'express';
import { PaymentService } from './payment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await PaymentService.getAllPayments();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payments retrieved successfully',
    data: result,
  });
};

const getSinglePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { invoiceId } = req.params;
  const result = await PaymentService.getSinglePayment(invoiceId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payments retrieved successfully',
    data: result,
  });
};

const paymentSuccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { invoiceId } = req.params;

  const result = await PaymentService.paymentSuccess(invoiceId);
  res.redirect(`http://localhost:3000/payment/success/${invoiceId}`);
};
const paymentFail = async (req: Request, res: Response, next: NextFunction) => {
  const { invoiceId } = req.params;

  const result = await PaymentService.paymentFail(invoiceId);

  res.redirect(`http://localhost:3000/payment/fail`);
};
const paymentCancel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { invoiceId } = req.params;
  const result = await PaymentService.paymentCancel(invoiceId);

  res.redirect(`http://localhost:3000/checkout`);
};

const initPayment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user!;
  const result = await PaymentService.initPayment(req.body, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment initiated successfully',
    data: result,
  });
};

const webhook = async (req: Request, res: Response, next: NextFunction) => {
  console.log('HIIIIIIT');
  const result = await PaymentService.webhook(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment validated successfully',
    data: result,
  });
};

export const PaymentController = {
  paymentCancel,
  paymentFail,
  paymentSuccess,
  getAllPayments,
  initPayment,
  webhook,
  getSinglePayment,
};
