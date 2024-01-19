import { Schema, model } from 'mongoose';
import { IPayment } from './paymetn.interface';

const paymentSchema = new Schema<IPayment, Record<string, never>>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    transactionId: { type: String, required: true, unique: true },
    paymentMethod: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      required: true,
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    paymentGatewayInfo: {
      type: Schema.Types.Mixed, // Use Mixed type to allow any JSON-like data
      default: {}, // Default value is an empty object, adjust as needed
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Payment = model<IPayment>('Payment', paymentSchema);
