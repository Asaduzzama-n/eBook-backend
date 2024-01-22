import { z } from 'zod';

const paymentInitValidation = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User id is required!' }), // Assuming userId is a UUID, adjust accordingly
    amount: z.number().min(0),
    paymentStatus: z.enum(['PENDING', 'SUCCESS', 'FAILURE']),
    books: z.array(z.string()), // Assuming book IDs are UUIDs
    paymentGatewayInfo: z.record(z.unknown()),
  }),
});

export const paymentValidation = { paymentInitValidation };
