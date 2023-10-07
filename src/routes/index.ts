import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { BookRoutes } from '../app/modules/book/book.route';
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
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
