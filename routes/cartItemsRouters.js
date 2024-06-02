import express from 'express';
import { CartController } from '../controllers/cartItemsController.js';

const routerCart = express.Router();

routerCart.post('/add', CartController.addItem);
routerCart.delete('/remove/:id', CartController.removeItem);
routerCart.get('/:userId', CartController.getCart);
routerCart.put('/update/:id', CartController.updateItem);

export default routerCart;
