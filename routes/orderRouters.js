import express from 'express';
import { OrderController } from '../controllers/orderController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerOrder = express.Router();

routerOrder.post('/create', authenticate, OrderController.createOrder);
routerOrder.get('/', authenticate, OrderController.getCompletedOrders);
