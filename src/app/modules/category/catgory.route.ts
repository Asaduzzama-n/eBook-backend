import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CategoryValidation } from './category.validation';
import { auth } from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';
import { CategoryController } from './category.controller';

const router = express.Router();
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryController.createCategory,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory,
);

router.get('/', CategoryController.getAllCategory);
export const CategoryRoutes = router;
