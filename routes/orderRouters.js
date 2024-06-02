import express from 'express';
import { OrderController } from '../controllers/orderController.js';

export const routerOrder = express.Router();

routerOrder.post('/create', OrderController.createOrder);

export default routerOrder;