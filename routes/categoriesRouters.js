import express from 'express';
import authenticate from '../middlewares/isAuth.js';
import {CategoryController} from '../controllers/categoriesController.js'

export const routerCategory = express.Router();

routerCategory.post('/', authenticate, CategoryController.createCategory);
routerCategory.get('/', authenticate, CategoryController.getCategories);
routerCategory.get('/:id', authenticate, CategoryController.getCategoryById);
routerCategory.put('/:id', authenticate, CategoryController.updateCategory);
routerCategory.delete('/:id', authenticate, CategoryController.deleteCategory);
routerCategory.get('/user/:userId', authenticate, CategoryController.getUserCategories);

