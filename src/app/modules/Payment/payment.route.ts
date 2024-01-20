import express from 'express';
import { PaymentController } from './payment.controller';

import { ENUM_USER_ROLE } from '../../../enum/user';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.get(
  '/:invoiceId',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  PaymentController.getSinglePayment,
);
router.get(
  '/payments',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  PaymentController.getAllPayments,
);

router.post('/success/:invoiceId', PaymentController.paymentSuccess);
router.post('/fail/:invoiceId', PaymentController.paymentFail);
router.post('/cancel/:invoiceId', PaymentController.paymentCancel);

router.post(
  '/init',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  PaymentController.initPayment,
);
router.post('/webhook', PaymentController.webhook);

export const PaymentRoutes = router;
