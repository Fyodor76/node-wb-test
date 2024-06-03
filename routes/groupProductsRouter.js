import express from 'express';
import { GroupProductController } from '../controllers/groupProductsController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerGroupProduct = express.Router();

routerGroupProduct.post('/', authenticate, GroupProductController.createGroupProduct);
routerGroupProduct.get('/', authenticate, GroupProductController.getGroupProducts);
routerGroupProduct.get('/:id', authenticate, GroupProductController.getGroupProductById);
routerGroupProduct.put('/:id', authenticate, GroupProductController.updateGroupProduct);
routerGroupProduct.delete('/:id', authenticate, GroupProductController.deleteGroupProduct);

