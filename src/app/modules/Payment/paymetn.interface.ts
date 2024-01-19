import { Model, Types } from 'mongoose';

export type IPayment = {
  userId: Types.ObjectId;
  transactionId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  books: Types.ObjectId[];
  paymentGatewayInfo: Record<string, any>;
};

export type PaymentModel = Model<IPayment>;
