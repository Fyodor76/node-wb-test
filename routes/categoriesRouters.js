import express from 'express';
import { CategoryController } from '../controllers/categoriesController.js';

const routerCategory = express.Router();

routerCategory.post('/', CategoryController.createCategory);
routerCategory.get('/', CategoryController.getCategories);
routerCategory.get('/:id', CategoryController.getCategoryById);
routerCategory.put('/:id', CategoryController.updateCategory);
routerCategory.delete('/:id', CategoryController.deleteCategory);

export default routerCategory;