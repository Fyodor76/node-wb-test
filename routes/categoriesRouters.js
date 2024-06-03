import express from 'express';
import { CategoryController } from '../controllers/categoriesController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerCategory = express.Router();

routerCategory.post('/', authenticate, CategoryController.createCategory);
routerCategory.get('/', authenticate, CategoryController.getCategories);
routerCategory.get('/:id', authenticate, CategoryController.getCategoryById);
routerCategory.put('/:id', authenticate, CategoryController.updateCategory);
routerCategory.delete('/:id', authenticate, CategoryController.deleteCategory);
