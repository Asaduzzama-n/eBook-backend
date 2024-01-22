import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { sslService } from '../ssl/ssl.service';
import { Payment } from './payment.model';
import { sendMail } from '../auth/sendResetMail';
import { sendInvoiceMail } from './sendInvoice';
import mongoose from 'mongoose';
import { Ebook } from '../book/book.model';
import { User } from '../user/user.model';

const getAllPayments = async () => {
  const result = await Payment.find({}).populate('books', { bookUrl: 1 });
  return result;
};

const getSinglePayment = async (invoiceId: string) => {
  const result = await Payment.findOne({ invoiceId: invoiceId })
    .populate('books', { coverImg: 1, title: 1, price: 1, isbn: 1 })
    .populate('userId', { name: 1, email: 1, contactNo: 1, address: 1 });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Purchase history not found!');
  }
  return result;
};

const initPayment = async (data: any, id: string) => {
  const transactionId = 'TXN-' + Date.now() + Math.floor(Math.random() * 1000);
  const invoiceId = 'INV-' + Date.now();
  const paymentSession = await sslService.initPayment({
    total_amount: data.amount,
    tran_id: transactionId, // use unique tran_id for each api call
    cus_name: data.name,
    cus_email: data.email,
    invoiceId: invoiceId,
  });
  console.log('DAta', data);
  const order = {
    userId: id,
    transactionId: transactionId,
    amount: data?.amount,
    books: data?.books,
    invoiceId: invoiceId,
  };

  const result = await Payment.create(order);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order');
  }

  return { redirectGatewayURL: paymentSession.redirectGatewayURL };
};

const paymentSuccess = async (invoiceId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Payment.findOneAndUpdate(
      { invoiceId: invoiceId },
      { $set: { paymentStatus: 'SUCCESS' } },
      { new: true },
    )
      .populate('userId')
      .populate('books');

    await Ebook.updateMany(
      { _id: { $in: result?.books } },
      { $inc: { sold: 1 } },
    );
    const bookIds = result?.books.map(book => book._id);

    await User.updateOne(
      { _id: result?.userId._id },
      { $push: { userBooks: { $each: bookIds } } },
    );

    if (!result) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to update payment status',
      );
    }

    await sendInvoiceMail(result);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return {
    message: 'Payment successful.',
  };
};

const paymentFail = async (invoiceId: string) => {
  const result = await Payment.findOneAndDelete({
    invoiceId: invoiceId,
  });

  return {
    message: 'Payment failed.',
  };
};

const paymentCancel = async (invoiceId: string) => {
  const result = await Payment.findOneAndDelete({
    invoiceId: invoiceId,
  });

  return {
    message: 'Payment failed.',
  };
};

const webhook = async (payload: any) => {
  if (!payload || !payload?.status || payload?.status !== 'VALID') {
    return {
      message: 'Invalid payment',
    };
  }

  const result = await sslService.validate(payload);

  if (result?.status !== 'VALID') {
    return {
      message: 'Payment failed',
    };
  }

  const { trans_id } = result;
  //UPDATE PAYMENT STATUS AFTER VALIDATION

  return result;
};

export const PaymentService = {
  paymentCancel,
  paymentFail,
  initPayment,
  webhook,
  getAllPayments,
  paymentSuccess,
  getSinglePayment,
};
