import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { BookRoutes } from '../app/modules/book/book.route';
import { AuthorRoutes } from '../app/modules/author/author.route';
import { BookContentRoutes } from '../app/modules/bookContent/bookContent.route';
import { ReviewRoutes } from '../app/modules/review/review.route';
import { WishListRoutes } from '../app/modules/wishlist/wishlist.route';
import { DiscountRoutes } from '../app/modules/discount/discount.route';
import { PaymentRoutes } from '../app/modules/Payment/payment.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/author',
    route: AuthorRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/content',
    route: BookContentRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishListRoutes,
  },
  {
    path: '/discounts',
    route: DiscountRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
