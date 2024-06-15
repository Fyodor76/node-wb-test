import express from 'express';
import { CartController } from '../controllers/cartItemsController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerCart = express.Router();

routerCart.post('/add', authenticate, CartController.addItem);
routerCart.delete('/remove/:id', authenticate, CartController.removeItem);
routerCart.get('/', authenticate, CartController.getCart);
routerCart.put('/update/:id', authenticate, CartController.updateItem);
